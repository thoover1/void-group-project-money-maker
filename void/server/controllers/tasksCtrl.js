module.exports = {
  displayTasks: async (req, res) => {
    const { group_id } = req.params;
    const db = req.app.get("db");
    const getTasks = await db.get_tasks(group_id);
    res.status(200).send(getTasks);
  },
  addTask: async (req, res) => {
    const { task_name, column_id, group_id } = req.body;
    const db = req.app.get("db");
    const getTasks = await db.add_task([task_name, column_id, group_id]);
    return res.status(200).send(getTasks);
  },
  updateTask: async (req, res) => {
    const { task_id } = req.params;
    const { task_name, group_id } = req.body;
    const db = req.app.get("db");
    const getTasks = await db.edit_task([task_name, task_id, group_id]);
    return res.status(200).send(getTasks);
  },
  deleteTask: async (req, res) => {
    const { task_id, group_id } = req.params;
    const db = req.app.get("db");
    const getTasks = await db.delete_task([task_id, group_id]);
    return res.status(200).send(getTasks);
  },
  switchColumn: async (req, res) => {
    const { task_id } = req.params;
    const { column_id, group_id } = req.body;
    console.log(111, column_id, group_id);
    const db = req.app.get("db");
    const getColumns = await db.switch_column([task_id, column_id, group_id]);
    return res.status(200).send(getColumns);
  }
};
