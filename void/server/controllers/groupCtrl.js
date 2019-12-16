module.exports = {
  getGroups: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const viewGroups = await db.get_groups([user_id]);
    res.status(200).send(viewGroups);
  },
  createGroup: (req, res, next) => {
    const db = req.app.get("db");
    const { group_name } = req.body;
    const { user_id } = req.session.user;
    db.create_group(group_name, user_id).then(group => {
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
    const db = req.app.get("db");
    const { group_id } = req.params;
    const members = await db.group_members(group_id);
    res.status(200).send(members);
  },
  getGroup: (req, res) => {
    const db = req.app.get("db");
    const {group_id} = req.params;
    db.get_group(group_id).then(group => {
      res.status(200).send(group);
    })
  },
  getGroupMember: (req,res,next) => {
    const db = req.app.get("db");
    const {user_id} = req.params;
    db.find_user_by_id(user_id).then(user => {
      res.status(200).send(user)
    }).catch(err => console.log(err))
  },
  updateUser: (req, res, next) => {
    const db = req.app.get("db");
    const {user} = req.params;
    const {user_id, group_id} = req.body;
    let name;
    if(user === 'user1'){
      name = db.update_group_user1
    } else if(user === 'user2'){
      name = db.update_group_user2
    } else if(user === 'user3'){
      name = db.update_group_user3
    } else if(user === 'user4'){
      name = db.update_group_user4
    } else if(user === 'user5'){
      name = db.update_group_user5
    } else if(user === 'user6'){
      name = db.update_group_user6
    } else if(user === 'user7'){
      name = db.update_group_user7
    } else if(user === 'user8'){
      name = db.update_group_user8
    } else if(user === 'user9'){
      name = db.update_group_user9
    } else if(user === 'user10'){
      name = db.update_group_user10
    }
    name(user_id, group_id).then(user => {
      res.status(200).send(user)
    }).catch(err => console.log(err))
  },
  getAllUsers: (req,res,next) => {
    const db = req.app.get("db");
    const {user_id} = req.session.user;
    db.get_all_users(user_id).then(users => {
      res.status(200).send(users)
    })
  },
  // displayBoard: async (req, res) => {
  //   const { group_id } = req.params;
  //   const db = req.app.get("db");
  //   const getBoard = await db.get_board([group_id]);
  //   res.status(200).send(getBoard);
  // }
};