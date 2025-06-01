#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Knex from 'knex';

const BATCH_SIZE = 500;

//parse env
function loadEnv(file) {
  const envPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(envPath)) {
    console.error(`Could not find ${file} in ${process.cwd()}`);
    process.exit(1);
  }
  return dotenv.parse(fs.readFileSync(envPath));
}

const srcEnv    = loadEnv('.env.source');
const targetEnv = loadEnv('.env.target');

//Knex config
const sourceConfig = {
  client: 'pg',
  connection: {
    host:     srcEnv.POSTGRES_HOST,
    port:     Number(srcEnv.POSTGRES_PORT),
    user:     srcEnv.POSTGRES_USER,
    password: srcEnv.POSTGRES_PASSWORD,
    database: srcEnv.POSTGRES_DB,
  },
  migrations: { directory: './migrations' },
  seeds:      { directory: './seeds' },
  pool:       { min: 0, max: 10 },
};

const targetConfig = {
  client: 'pg',
  connection: {
    host:     targetEnv.POSTGRES_HOST,
    port:     Number(targetEnv.POSTGRES_PORT),
    user:     targetEnv.POSTGRES_USER,
    password: targetEnv.POSTGRES_PASSWORD,
    database: targetEnv.POSTGRES_DB,
  },
  migrations: { directory: './migrations' },
  pool:       { min: 0, max: 10 },
};

//Migration in main
async function main() {
  const src = Knex(sourceConfig);
  const tgt = Knex(targetConfig);

  try {
    //src setup
    await src.migrate.latest();
    await src.seed.run();

    //tgt schema
    await tgt.migrate.latest();

    //migrate data from src to tgt
    const tables = await src('information_schema.tables')
      .select('table_name')
      .where({
        table_schema: 'public',
        table_type:   'BASE TABLE',
      })
      .whereNotIn('table_name', [
        'knex_migrations',
        'knex_migrations_lock'
      ]);

    for (let { table_name } of tables) {
      process.stdout.write(`→ ${table_name}… `);
      await tgt.raw(`TRUNCATE TABLE "${table_name}" RESTART IDENTITY CASCADE`);

      let offset = 0;
      while (true) {
        const rows = await src(table_name)
          .select('*')
          .limit(BATCH_SIZE)
          .offset(offset);
        if (rows.length === 0) break;
        await tgt.batchInsert(table_name, rows, BATCH_SIZE);
        offset += rows.length;
      }
      console.log(`done (copied ${offset} rows)`);
    }

    console.log('All tables migrated!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await src.destroy();
    await tgt.destroy();
  }
}

main();
