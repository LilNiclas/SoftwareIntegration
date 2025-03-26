# Guide til Opsætning og Deployment af PostgreSQL Database med Docker

## 1. Opret Database

Først opret en `init.sql`-fil, der indeholder SQL-kommandoerne til at oprette PostgreSQL-databasen.

```sql
-- Drop and create DB
DROP DATABASE IF EXISTS goats_db;
CREATE DATABASE goats_db;

-- Connect to DB
\c goats_db;

-- Create Table
CREATE TABLE goats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    power INT NOT NULL
);

-- Insert data
INSERT INTO goats (name, power) VALUES 
    ('Sadio Mane', 6000),
    ('Mame Diouf', 9999),
    ('Mo Salah', 7500),
    ('Trent Alexander-Arnold', 9998);

-- Create users
CREATE USER admin_user WITH PASSWORD 'admin123';
CREATE USER policy_user WITH PASSWORD 'policy123';
CREATE USER read_user WITH PASSWORD 'read123';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE goats_db TO admin_user;
GRANT ALL PRIVILEGES ON TABLE goats TO admin_user;
GRANT ALL PRIVILEGES ON TABLE goats TO policy_user;
GRANT SELECT ON TABLE goats TO read_user;

-- Enable RLS
ALTER TABLE goats ENABLE ROW LEVEL SECURITY;

-- Policy for policy_user to only access id = 3
CREATE POLICY select_policy ON goats
    FOR SELECT TO policy_user
    USING (id = 3);
```

## 2. Kør PostgreSQL Containeren med Docker

Nu skal vi køre PostgreSQL containeren og linke den til vores init.sql-fil, som vil blive kørt automatisk ved container-opstart.

Giv denne Powershell kommando
```powershell
docker run -d --name my-postgres -p 5431:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=goats_db -v ${PWD}/init.sql:/docker-entrypoint-initdb.d/init.sql:ro -v my_pgdata:/var/lib/postgresql/data postgres:latest
```

-d: Kør containeren i baggrunden

--name my-postgres: Navn til container

-p 5431:5432: Port 5432 fra containeren til port 5431 på din maskine.

-e POSTGRES_USER=admin: PostgreSQL brugeren.

-e POSTGRES_PASSWORD=123: kodeorder.

-e POSTGRES_DB=goats_db: Opret database med navnet goats_db.

-v ${PWD}/init.sql:/docker-entrypoint-initdb.d/init.sql:ro: Link init.sql til containeren.

-v my_pgdata:/var/lib/postgresql/data: Behold data, så den ikke forsvinder når containeren stoppes.

## 3. Verificer at Containeren Kører
```powershell
docker ps
```

## 4. Forbind til Databasen

- Lokalt:
psql -h localhost -p 5431 -U admin_user -d goats_db

- På en anden maskine: Erstat IP-adressen 192.xxx.xx.x og porten 5431 med de rigtige oplysninger:
```powershell
psql -h 192.xxx.xx.xx -p 5431 -U admin_user -d goats_db
```

## 5. Verificer indholdet i Databasen
Når du er logget ind på PostgresSQL, kan du tjekke om din tabel er oprettet korrekt

- For at se tabellerne
    ```sql
    \dt
    ```

- For at se dataen i tabellen
    SELECT* FROM goats;


## 6. Fejlhåntering hvis indholdet i databasen ikke er der (Hvis nødvendigt)
Hvis containeren ikke har kørt init.sql korrekt, kan du manuelt eksekvere denne fil i containeren med denne PowerShell-kommando:

```powershell
Get-Content .\init.sql | docker exec -i my-postgres psql -U postgres -d goats_db
```

Eller, hvis ${PWD} ikke fungerer, kan du bruge den fulde sti til init.sql:
```powershell
docker run -d --name my-postgres -p 5431:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=goats_db -v C:\Users\nicla\init.sql:/docker-entrypoint-initdb.d/init.sql:ro -v my_pgdata:/var/lib/postgresql/data postgres:latest
```