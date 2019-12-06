SELECT column_id, column_name, groups.group_id
FROM columns
    JOIN groups
    ON columns.group_id = groups.group_id
WHERE groups.group_id = $1;