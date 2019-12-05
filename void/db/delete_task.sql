DELETE FROM tasks
WHERE task_id = $1;

SELECT *
FROM tasks
WHERE group_id = $2;