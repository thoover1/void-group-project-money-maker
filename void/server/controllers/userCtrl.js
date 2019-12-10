const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    // could potentially include first name, last name, contact info, etc. used for "profile" info
    const { username, email, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.find_user_by_email(email);
    if (foundUser.length) {
      return res.status(400).send("User already exists!");
    } else {
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const [newUser] = await db.create_user([username, email, hashedPassword]);
      req.session.user = newUser;
      res.status(200).send(req.session.user);
    }
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.find_user_by_email(email)
      .then(([foundUser]) => {
        if (!foundUser) {
          res.status(400).send("User not found.");
        } else {
          bcrypt.compare(password, foundUser.password).then(isAuthenticated => {
            if (isAuthenticated) {
              req.session.user = {
                user_id: foundUser.user_id,
                username: foundUser.username,
                password: foundUser.password,
                email: foundUser.email,
                image: foundUser.image
              };
              res.status(200).send(req.session.user);
            } else {
              res.status(400).send("Login failed!");
            }
          });
        }
      })
      .catch(err => console.log(err));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("See you next time!");
  },
  userSession: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  deleteAccount: (req, res, next) => {
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.delete_user(user_id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(console.log(err));
      });
  },
  updatePicture: (req, res, next) => {
    const db = req.app.get("db");
    const { image } = req.body;
    const { user_id } = req.session.user;
    db.update_picture(image, user_id)
      .then(image => {
        res.status(200).send(image);
      })
      .catch(err => {
        res.status(500).send(console.log(err));
      });
  },
  uploadPicture: (req, res, next) => {
    const db = req.app.get("db");
    const { image } = req.body;
    const { user_id } = req.session.user;
    db.upload_picture(image, user_id)
      .then(image => {
        res.status(200).send(image);
      })
      .catch(err => {
        res.status(500).send(console.log(err));
      });
  },
  updateUsername: (req, res, next) => {
    const db = req.app.get("db");
    const { username } = req.body;
    const { user_id } = req.session.user;
    db.update_username(username, user_id)
      .then(username => {
        res.status(200).send(username);
      })
      .catch(err => {
        res.status(500).send(console.log(err));
      });
  },
  updateEmail: (req, res, next) => {
    const db = req.app.get("db");
    const { email } = req.body;
    const { user_id } = req.session.user;
    db.update_email(email, user_id)
      .then(email => {
        res.status(200).send(email);
      })
      .catch(err => {
        res.status(500).send(console.log(err));
      });
  },
  updatePassword: async (req, res) => {
    const db = req.app.get("db");
    const { password, oldPassword } = req.body;
    const { user } = req.session;
    const isAuth = await bcrypt.compare(oldPassword, user.password);
    if (isAuth) {
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const [newPassword] = await db.update_password(
        hashedPassword,
        user.user_id
      );
      user.password = newPassword;
      res.status(200).send(user);
    }
  }
};
