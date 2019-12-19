-- ALTER TABLE columns
-- DROP CONSTRAINT columns_group_id_fkey;
-- ALTER TABLE tasks
-- DROP CONSTRAINT tasks_group_id_fkey;
-- ALTER TABLE tasks
-- DROP CONSTRAINT tasks_column_id_fkey;

DELETE FROM tasks
WHERE group_id = $1;
DELETE FROM columns
WHERE group_id = $1;
DELETE FROM groups
WHERE group_id = $1;

