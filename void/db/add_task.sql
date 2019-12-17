INSERT INTO tasks
    (task_name, column_id, group_id)
VALUES
    ($1, $2, $3);

SELECT task_id, task_name, tasks.group_id columns.column_id
FROM tasks
    JOIN columns
    ON columns.column_id = tasks.column_id
    JOIN groups
    ON groups.group_id = columns.group_id
WHERE groups.group_id = $3;
