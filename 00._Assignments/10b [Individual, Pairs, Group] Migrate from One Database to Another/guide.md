# Docker-compose
docker-compose down -v 	# “-v” deletes the named volumes so the DB init runs again
docker-compose up -d

#  Verify you can connect manually once they’re up:
psql -h localhost -p 5433 -U myuser -d sourcedb
psql -h localhost -p 5434 -U myuser -d targetdb

# Run migration
npm run migrate
