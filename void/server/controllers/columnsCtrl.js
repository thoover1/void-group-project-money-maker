module.exports = {
  displayColumns: async (req, res) => {
    const { group_id } = req.body;
    const db = req.app.get("db");
    const getColumns = await db.get_columns([group_id]);
    res.status(200).send(getColumns);
  },
  addColumn: async (req, res) => {
    const { column_name, group_id } = req.body;
    const db = req.app.get("db");
    const getColumns = await db.create_column([column_name, group_id]);
    return res.status(200).send(getColumns);
  },
  updateColumn: async (req, res) => {
    const { column_id } = req.params;
    const { column_name, group_id } = req.body;
    const db = req.app.get("db");
    const getColumns = await db.edit_column([column_name, column_id, group_id]);
    return res.status(200).send(getColumns);
  },
  deleteColumn: async (req, res) => {
    const { column_id } = req.params;
    const { group_id } = req.body;
    const db = req.app.get("db");
    const getColumns = await db.delete_column([column_id, group_id]);
    return res.status(200).send(getColumns);
  }
};
