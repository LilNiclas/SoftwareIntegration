import 'dotenv/config';

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: 'postgresql',
  connection: {
    database: "mydatabase",
    user: "myuser",
    password: "mypassword",
    host: "localhost",
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};