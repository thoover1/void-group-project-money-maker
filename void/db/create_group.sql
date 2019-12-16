INSERT INTO groups (group_name, user1)
VALUES ($1, $2);

INSERT INTO columns (column_name, group_id)
VALUES
('to-do', (SELECT group_id FROM groups WHERE group_name = $1)),
('in progress', (SELECT group_id FROM groups WHERE group_name = $1)),
('completed', (SELECT group_id FROM groups WHERE group_name = $1));

SELECT * FROM groups
WHERE group_name = $1;