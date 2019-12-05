UPDATE tasks
SET task_name = $1
WHERE task_id = $2;

SELECT *
FROM tasks
WHERE group_id = $3;
