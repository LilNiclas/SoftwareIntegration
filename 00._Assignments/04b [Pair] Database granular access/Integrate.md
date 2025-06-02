# Guide til at Integrere med sql databasen

## 1. Kom i kontakt

Kom i kontakt med mig, så jeg kan expose databasen.

Du vil i følge af dette modtage 2 værdier, der skal bruges til integrationen:

- `URL`
- `Portnummer`

### Roller og kodeord
- admin_user med koden admin123
- policy_user med koden policy123
- read_user med koden read123

"""\
| **Role**      | **Access Level**       | **Permissions**                                                       |
|---------------|------------------------|------------------------------------------------------------------------|
| `admin_user`  | Full                   | Full access to all data and actions (SELECT, INSERT, UPDATE, DELETE). |
| `policy_user` | Restricted | Can only read rows where `id = 1` due to RLS policy.                  |
| `read_user`   | Read-Only              | Can read all rows (SELECT), but cannot modify or insert any data.     |"""


## 2. Forbind til databasen

- Erstat url x.tcp.eu.ngrok.io og porten med de rigtige oplysninger for at komme i forbindelse med databasen:
    ```powershell
    psql -h 2.tcp.eu.ngrok.io -p 19935 -U admin_user -d goats_db
    ```

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

- For at opdatere
```sql
    UPDATE goats
    SET name= 'Mr bang'
    WHERE id = 1;
```

- For at logge ud og prøve en anden user
    ```sql
    \q
    ```
