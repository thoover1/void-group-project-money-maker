-- SELECT group_id, group_name, users.user_id, username
-- FROM groups
--     JOIN users
--     ON groups.user_id = users.user_id
-- WHERE users.user_id = $1;

SELECT *
FROM groups
WHERE user1 = $1;
SELECT *
FROM groups
WHERE user2 = $1;
SELECT *
FROM groups
WHERE user3 = $1;
SELECT *
FROM groups
WHERE user4 = $1;
SELECT *
FROM groups
WHERE user5 = $1;
SELECT *
FROM groups
WHERE user6 = $1;
SELECT *
FROM groups
WHERE user7 = $1;
SELECT *
FROM groups
WHERE user8 = $1;
SELECT *
FROM groups
WHERE user9 = $1;
SELECT *
FROM groups
WHERE user10 = $1;