INSERT INTO groups(group_name, user_id, user1, user2, user3, user4, user5)
VALUES ($1, $2, $3, $4, $5, $6, $7)
SELECT group_name, user_id, user1, user2, user3, user4, user5
FROM groups
WHERE group_name = $1;