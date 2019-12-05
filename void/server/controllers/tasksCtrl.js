module.exports = {
  displayBoard: async (req, res) => {
    const { group_id } = req.body;
    const db = await req.app.get("db");
    const getBoard = await db.get_board([group_id]);
    res.status(200).send(getBoard);
  },
  addTask: async (req, res) => {
    const { task_name, column_id, group_id } = req.body;
    const db = await req.app.get("db");
    const getBoard = await db.add_task([task_name, column_id, group_id]);
    return res.status(200).send(getBoard);
  },
  updateTask: async (req, res) => {
    const { task_id } = req.params;
    const { task_name, group_id } = req.body;
    const db = req.app.get("db");
    const getBoard = await db.edit_task([task_name, task_id, group_id]);
    return res.status(200).send(getBoard);
  },
  deleteTask: async (req, res) => {
    const { task_id } = req.params;
    const { group_id } = req.body;
    const db = req.app.get("db");
    const getBoard = await db.delete_task([task_id, group_id]);
    return res.status(200).send(getBoard);
  },
  moveTask: async (req, res) => {
    const { task_id, column_id, group_id } = req.body;
    const db = req.app.get("db");
    const getBoard = await db.move_task([task_id, column_id, group_id]);
    return res.status(200).send(getBoard);
  }
};
