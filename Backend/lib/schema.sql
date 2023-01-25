DROP TABLE IF EXISTS urls;
DROP TABLE IF EXISTS requests;

CREATE TABLE urls (
  id serial PRIMARY KEY,
  url text NOT NULL, -- name of url
  session_id text NOT NULL -- who owns the plant
);

-- ALTER TABLE plantlists
--   ADD UNIQUE (name, username);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  "date" date NOT NULL DEFAULT NOW(),
  request_nosql_id text NOT NULL,
  method text NOT NULL,
  "path" text NOT NULL,
  host text NOT NULL,
  session_id text NOT NULL,
  url_id int 
    NOT NULL
    REFERENCES urls(id) 
    ON DELETE CASCADE
);

-- CREATE TABLE users (
--   username text PRIMARY KEY,
--   password text NOT NULL
-- );