require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

// for static server
// app.use(express.static(__dirname + `../build`));

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  })
);

// connects server to postgreSQL
massive(CONNECTION_STRING).then(db => {
  console.log("database connected");
  app.set("db", db);
});

// endpoints for login/logout/registering
app.post("/auth/register", uc.register);
app.post("/auth/login", uc.login);
app.get("/auth/userSession", uc.userSession);
app.delete("/auth/logout", uc.logout);

// only allows users with profile to use app
// app.use((req, res, next) => {
//   if (req.session.user) return next();
//   else res.sendStatus(401);
// });

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
