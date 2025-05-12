docker-compose down -v

docker-compose up

docker ps

docker-compose restart

npx knex migrate:latest

\dt

npx knex seed:run

SELECT * FROM users;

docker compose exec -T db pg_dump -U myuser mydatabase > pgdump.sql