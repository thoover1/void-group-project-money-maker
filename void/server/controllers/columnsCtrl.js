module.exports = {
  displayColumns: (req, res) => {
    const db = req.app.get("db");
    const { group_id } = req.params;
    db.get_columns(group_id)
      .then(columns => {
        res.status(200).send(columns);
      })
      .catch(err => console.log(err));
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
