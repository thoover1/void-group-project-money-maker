module.exports = {
  addUser1: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user1(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser2: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user2(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser3: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user3(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser4: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user4(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser5: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user5(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser6: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user6(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser7: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user7(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser8: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user8(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser9: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user9(user_id).then(data => {
      res.status(200).send(data);
    });
  },
  addUser10: (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session;
    db.update_group_user10(user_id).then(data => {
      res.status(200).send(data);
    });
  }
};
