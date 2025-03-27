# Guide til at Integrere med sql databasen

## 1. Kom i kontakt

Kom i kontakt med mig, så jeg kan expose databasen.

Du vil i følge af dette modtage 2 værdier, der skal bruges til integrationen:

- `IP-adresse`
- `Portnummer`

## 2. Forbind til databasen

- Erstat IP-adressen 192.xxx.xx.x og porten 5431 med de rigtige oplysninger for at komme i forbindelse med databasen:
    ```powershell
    psql -h 192.xxx.xx.xx -p 5431 -U admin_user -d goats_db
    ```
- Koden til admin_user er: admin123

## 3. Leg med databasen
Når du er logget ind på PostgresSQL, kan du begynde rodde og teste databasen

- For at se tabellerne
    ```sql
    \dt
    ```

- For at se dataen i tabellen
    ```sql
    SELECT* FROM goats;
    ```
- For at logge ud og prøve en anden user
    ```sql
    \q
    ```

