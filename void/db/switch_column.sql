UPDATE tasks
SET column_id = $2
WHERE task_id = $1;

SELECT task_id, task_name, columns.column_id
FROM tasks
    JOIN columns
    ON columns.column_id = tasks.column_id
    JOIN groups
    ON groups.group_id = columns.group_id
WHERE groups.group_id = $3;