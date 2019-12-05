require("dotenv").config();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const express = require("express");
const app = express();
app.use(express.json());
const massive = require("massive");
const session = require("express-session");
// const socket = require("socket.io");
const {register, login, userSession, logout} = require("./controllers/userCtrl");

// for static server
// app.use(express.static(__dirname + `../build`));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

// used below to enter already-created group board
// user1Id = "";

// connects server to postgreSQL
massive(CONNECTION_STRING).then(db => {
  console.log("Database connected!");
  app.set("db", db);

  // allows sockets to listen to server, I think...
  // const io = socket(
  //   app.listen(SERVER_PORT, () => {
  //     console.log(`Server running on port ${SERVER_PORT}`);
  //   })
  // );
  // // connects front end to sockets/server, I think...
  // io.on("connection", client => {
  //   client.leave(client.id);
  //   // console.log(client.id);

  //   // used for chat/messaging
  //   // client.on("SEND_MESSAGE", function(data) {
  //   //   console.log("message sent");
  //   //   io.emit("RECEIVE_MESSAGE", data);
  //   // });

  //   // creating group boards
  //   client.on("createGroupBoard", data => {
  //     let { groupBoard } = data;
  //     client.join(groupBoard);
  //     console.log("created board");
  //     io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
  //   });

  //   // sends group boards to others
  //   client.on("sendBoardToOthers", data => {
  //     let { groupBoard, board1 } = data;
  //     client.in(groupBoard).emit("boardSentToOthers", board1);
  //   });

  //   // joining group boards YOU created
  //   client.on("joinMyGroupBoard", data => {
  //     let { groupBoard } = data;
  //     client.join(groupBoard);
  //     console.log("joined MY board");
  //   });

  //   // joining group boards other user created - may have to add more boards (e.g. board3, board4, etc.) depending on how many user there are? (up to 10?)
  //   client.on("joinCreatedGroupBoard", data => {
  //     let { board2, groupBoard } = data;
  //     io.in(groupBoard).emit("groupBoardJoined", { board2 });
  //     (user1 = ""), io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
  //   });

  //   // moving cards around into other columns
  //   client.on("moveCard", payload => {
  //     client.emit("cardMoved", payload);
  //   });

  //   // exiting boards
  //   client.on("leaveGroupBoard", groupBoard => {
  //     client.leave(groupBoard);
  //     console.log("left board");
  //     io.emit("gotGroupBoard", io.sockets.adapter.groupBoards);
  //   });
  // });
}).catch(err => console.log(err));

// endpoints for login/logout/registering
app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/session", userSession);
app.delete("/auth/logout", logout);

// only allows users with profile to use app
// app.use((req, res, next) => {
//   if (req.session.user) return next();
//   else res.sendStatus(401);
// });

let port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));