DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS columns;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    image TEXT
);

INSERT INTO users
    (username, password, email, image)
VALUES
    ('joely', '$2b$12$vQoFQZHvmHJo.qYg1bAzse/HOnhWbdsT1ml4iyPYMSjNTK0kYINES', 'j@j.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    ('gina', '$2b$12$79KhguzteBvTN2u6GbfnUe1KzkCsPve7KOXeLMygNO5IlPSK9c46a', 'g@g.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    ('thomas', '$2b$12$TlgcTB749vz5nVQ4GsuZCuuM9GTfWO3MLXK1L//4qTHvdRpJ7T0rm', 't@t.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
    ('isaac', '$2b$12$J1Y0tPe.qSQrh6AnJuqksOEaHDoOlEF0KQbP6uiKK58QWzi5detB.', 'i@i.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

CREATE TABLE groups
(
    group_id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL,
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

INSERT INTO groups
    (group_name, user1, user2, user3, user4)
VALUES
    ('VOID', 1, 2, 3, 4);

CREATE TABLE columns
(
    column_id SERIAL PRIMARY KEY,
    column_name TEXT NOT NULL,
    group_id INTEGER REFERENCES groups(group_id)
);

INSERT INTO columns
    (column_name, group_id)
VALUES
    ('to-do', 1),
    ('in progress', 1),
    ('completed', 1);

CREATE TABLE tasks
(
    task_id SERIAL PRIMARY KEY,
    task_name TEXT NOT NULL,
    column_id INTEGER REFERENCES columns(column_id),
    group_id INTEGER REFERENCES groups(group_id)
);

INSERT INTO tasks
    (task_name, column_id, group_id)
VALUES
    ('finish void', 2, 1),
    ('add change group name', 1, 1),
    ('fix group name box', 2, 1),
    ('trigger re-render upon group creation', 3, 1),
    ('fix sidebar menus', 2, 1),
    ('add us to landing', 2, 1);
