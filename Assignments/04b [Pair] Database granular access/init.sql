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
