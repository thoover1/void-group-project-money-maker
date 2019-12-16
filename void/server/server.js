require("dotenv").config();

const gc = require("./controllers/groupCtrl");
const cc = require("./controllers/columnsCtrl");
const tc = require("./controllers/tasksCtrl");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const express = require("express");

const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.json());

const {
  register,
  login,
  userSession,
  logout,
  updatePicture,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteAccount
} = require("./controllers/userCtrl");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./controllers/chatCtrl");

// for static server
// app.use(express.static(__dirname + `../build`));

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

// used below to enter already-created group board
// user1Id = "";

// connects server to postgreSQL
massive(CONNECTION_STRING)
  .then(db => {
    console.log("Database connected!");
    app.set("db", db);
  })
  .catch(err => console.log(err));

// endpoints for login/logout/registering
app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/session", userSession);
app.delete("/auth/logout", logout);

app.put("/api/update_pic", updatePicture);
app.put("/api/update_username", updateUsername);
app.put("/api/update_email", updateEmail);
app.put("/api/update_password", updatePassword);

app.delete("/api/delete_account", deleteAccount);

// endpoints for groups
app.post("/api/create_group", gc.createGroup);
// app.post("/api/add_user", gc.addUser);
// app.delete("/api/remove_user/", gc.removeUser);
app.get("/api/display_board", gc.displayBoard);

// endpoints for columns
app.get("/api/display_columns", cc.displayColumns);
app.post("/api/add_column", cc.addColumn);
app.put("/api/update_column/:column_id", cc.updateColumn);
app.delete("/api/delete_column/:column_id/", cc.deleteColumn);

// endpoints for tasks
app.get("/api/display_tasks", tc.displayTasks);
app.post("/api/add_task", tc.addTask);
app.put("/api/update_task/:task_id", tc.updateTask);
app.delete("/api/delete_task/:task_id/", tc.deleteTask);

// only allows users with profile to use app
// app.use((req, res, next) => {
//   if (req.session.user) return next();
//   else res.sendStatus(401);
// });


//sockets
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
})



let port = SERVER_PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}.`));
