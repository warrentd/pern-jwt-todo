CREATE DATABASE pernjwttodo;

--set extension
--create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid primary key default uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null
);

--insert fake users
INSERT INTO users (
    user_name, user_email, user_password
) VALUES (
    'Trenton', 'tdwarren0001@gmail.com', 'PhoenixComp96734'
);