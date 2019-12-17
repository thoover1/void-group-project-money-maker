DELETE FROM groups
WHERE group_id = $1;

DELETE FROM columns
WHERE group_id = $1;

DELETE FROM tasks
WHERE group_id = $1;