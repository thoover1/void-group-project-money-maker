UPDATE tasks
SET column_id = $2
WHERE task_id = $1;

SELECT *
FROM tasks
WHERE group_id = $3;