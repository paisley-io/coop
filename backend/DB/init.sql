--- Local Dev Init for paisley_local DB
-- Creates api_user with password 'api'

-- Create user if not exists
DO
$$
BEGIN
   IF NOT EXISTS (
     SELECT FROM pg_catalog.pg_roles WHERE rolname = 'api_user'
   ) THEN
     CREATE USER api_user WITH PASSWORD 'api';
   END IF;
END
$$;

-- Drop and recreate the database
DROP DATABASE IF EXISTS paisley_local;
CREATE DATABASE paisley_local;
REVOKE ALL ON DATABASE paisley_local FROM PUBLIC;
GRANT CONNECT ON DATABASE paisley_local TO api_user;

-- Switch to the new DB
\c paisley_local

-- Restrict public schema
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO api_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO api_user;

-- Optionally include schema/triggers (you can add them later manually)
-- \i db/scripts/V001__triggers.sql

-- Done
\echo End init.sql
