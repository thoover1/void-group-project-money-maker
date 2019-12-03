SELECT users.user_id, username, email
FROM users
WHERE email = $1;