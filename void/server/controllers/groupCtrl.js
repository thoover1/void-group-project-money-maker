module.exports = {
    createGroup: (req,res,next) => {
        const db = req.app.get('db');
        const {user} = req.session;
        db.create_group(user).then(group => {
            res.status(200).send(group)
        })
    },
    addUser: (req,res,next) => {
        const {newUser} = req.body;
        const {user} = req.session;
        const db = req.app.get('db');
    },
    // removeUser,

}

  // add user to group
  // remove user from group