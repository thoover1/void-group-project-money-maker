-- SELECT group_id, group_name, users.user_id, username
-- FROM groups
--     JOIN users
--     ON groups.user_id = users.user_id
-- WHERE users.user_id = $1;

SELECT * FROM groups
WHERE 
user1 = $1 OR 
user2 = $1 OR 
user3 = $1 OR 
user4 = $1 OR 
user5 = $1 OR 
user6 = $1 OR 
user7 = $1 OR 
user8 = $1 OR 
user9 = $1 OR 
user10 = $1;