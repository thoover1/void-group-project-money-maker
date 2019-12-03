const bcrypt = require("bcrypt-nodejs");

module.exports = {
  register: async (req, res) => {
    // could potentially include first name, last name, contact info, etc. used for "profile" info
    const { email, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db
      .find_user_by_email(email)
      .catch(err => console.log(err));
    if (foundUser.length) {
      res.status(400).send("user already exists");
    } else {
      const saltRounds = 12;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const [newUser] = await db
        .create_user([email, hashedPassword])
        .catch(err => console.log(err));
      req.session.user = newUser;
      res.status(200).send(req.session.user);
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    db.find_user_by_email(email).then(([foundUser]) => {
      if (!foundUser) {
        res.status(400).send(alert("No user info found."));
      } else {
        bcrypt.compare(password, foundUser.password).then(isAuthenticated => {
          if (isAuthenticated) {
            req.session.user = {
              user_id: foundUser.user_id,
              email: foundUser.email
            };
            res.status(200).send(req.session.user);
          } else {
            res.status(400).send("You need to register an account first.");
          }
        });
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("See you next time!");
  },
  userSession: (req, res) => {
    res.status(200).send(req.session.user);
  },
  deleteAccount: (req,res,next) => {
    const {user} = req.session;
    const db = req.app.get('db');
    db.delete_user(user).then((res) => {
      res.status(200).send(console.log('account deleted'))
    })
  }
};
