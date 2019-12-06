module.exports = {
  createGroup: (req, res, next) => {
    const db = req.app.get("db");
    const { user } = req.session;
    db.create_group(user).then(group => {
      res.status(200).send(group);
    });
  },
  addUser: (req, res, next) => {
    const { newUser } = req.body;
    const { user } = req.session;
    const db = req.app.get("db");
  },
  // removeUser,
  displayBoard: async (req, res) => {
    const { group_id } = req.body;
    const db = await req.app.get("db");
    const getBoard = await db.get_board([group_id]);
    res.status(200).send(getBoard);
  }
};

// add user to group
// remove user from group
