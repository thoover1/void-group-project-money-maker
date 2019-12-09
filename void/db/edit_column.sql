UPDATE columns
SET column_name = $1
WHERE column_id = $2;

SELECT column_id, column_name, groups.group_id
FROM columns
    JOIN groups
    ON columns.group_id = groups.group_id
WHERE groups.group_id = $3;

