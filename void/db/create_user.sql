INSERT INTO users(username, email, password, image)
VALUES ($1, $2, $3, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

SELECT username, email FROM users
WHERE email = $2;