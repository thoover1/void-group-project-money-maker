module.exports = {
  getGroups: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const viewGroups = await db.get_groups([user_id]);
    res.status(200).send(viewGroups);
  },
  createGroup: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.create_group(user_id).then(group => {
      res.status(200).send(group);
    });
  },
  deleteGroup: async (req, res) => {
    const { group_id } = req.body;
    const db = req.app.get("db");
    const viewGroups = await db.delete_group([group_id]);
    res.status(200).send(viewGroups);
  },
  groupMembers: async (req, res) => {
    const { group_id } = req.body;
    const db = req.app.get("db");
    const getMembers = await db.group_members([group_id]);
    res.status(200).send(getMembers);
  },
  getGroup: (req, res) => {
    const db = req.app.get("db");
    const {group_id} = req.params;
    db.get_group(group_id).then(group => {
      res.status(200).send(group);
    })
  }
  // addUser: (req, res, next) => {
  //   const { newUser } = req.body;
  //   const { user_id } = req.session;
  //   const db = req.app.get("db");
  // },
  // displayBoard: async (req, res) => {
  //   const { group_id } = req.params;
  //   const db = req.app.get("db");
  //   const getBoard = await db.get_board([group_id]);
  //   res.status(200).send(getBoard);
  // }
  // ,
  // removeUser:
};

// add user to group
// remove user from group
