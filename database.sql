CREATE DATABASE pernjwttodo;

--set extension
--create extension if not exists "uuid-ossp";

--user table
CREATE TABLE users(
    user_id uuid primary key default uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) not null unique,
    user_password varchar(255) not null
);

--todo table
CREATE TABLE todos(
    todo_id serial primary key,
    user_id uuid,
    description varchar(255) not null,
    foreign key (user_id) references users(user_id)
);

--insert fake users
INSERT INTO users (
    user_name, user_email, user_password
) VALUES (
    'Trenton', 'tdwarren0001@gmail.com', 'PhoenixComp96734'
),(
    'Morgan', 'morgan@gmail.com', 'Morgan'
);

--insert fake todos
INSERT INTO todos (
    user_id, description
) VALUES (
    'a0d023be-6ba1-45f1-9594-e1c6a537ed9f', 'Wash Audi'
), (
    'a0d023be-6ba1-45f1-9594-e1c6a537ed9f', 'Wash Jeep'
), (
    'a0d023be-6ba1-45f1-9594-e1c6a537ed9f', 'Clean House'
), (
    '77d65a02-a1df-4527-bd54-9e011d485e12', 'Pressure Wash'
), (
    '77d65a02-a1df-4527-bd54-9e011d485e12', 'Do Laundry'
);