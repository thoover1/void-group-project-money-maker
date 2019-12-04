DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    user1 INTEGER,
    user2 INTEGER,
    user3 INTEGER,
    user4 INTEGER,
    user5 INTEGER,
    user6 INTEGER,
    user7 INTEGER,
    user8 INTEGER,
    user9 INTEGER,
    user10 INTEGER 
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT unique NOT NULL,
    username TEXT unique NOT NULL,
    password VARCHAR(64) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name TEXT NOT NULL,
    group_id INTEGER REFERENCES groups(group_id),
);