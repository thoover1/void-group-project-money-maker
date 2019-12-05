INSERT INTO tasks
    (task_name, column_id, group_id)
VALUES
    ($1, $2, $3);

SELECT *
FROM tasks
WHERE group_id = $3;
