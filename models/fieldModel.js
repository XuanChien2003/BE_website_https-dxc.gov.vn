const sql = require("mssql");
const config = require("../config/dbConfig");

async function getAll() {
  const pool = await sql.connect(config);
  return (await pool.request().query("SELECT * FROM Fields")).recordset;
}

async function create(data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("Name", sql.NVarChar, data.name)
    .input("Code", sql.VarChar, data.code)
    .query("INSERT INTO Fields (Name, Code) VALUES (@Name, @Code)");
}

async function update(id, data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("FieldID", sql.Int, id)
    .input("Name", sql.NVarChar, data.name)
    .input("Code", sql.VarChar, data.code)
    .query(
      "UPDATE Fields SET Name = @Name, Code = @Code WHERE FieldID = @FieldID"
    );
}

async function remove(id) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Fields WHERE FieldID = @id");
}

module.exports = { getAll, create, update, remove };
