const sql = require("mssql");
const config = require("../config/dbConfig");

async function getAll() {
  const pool = await sql.connect(config);
  return (await pool.request().query("SELECT * FROM DocumentTypes")).recordset;
}

async function create(data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("Name", sql.NVarChar, data.name)
    .input("Code", sql.VarChar, data.code)
    .query("INSERT INTO DocumentTypes (Name, Code) VALUES (@Name, @Code)");
}

async function update(id, data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("TypeID", sql.Int, id)
    .input("Name", sql.NVarChar, data.name)
    .input("Code", sql.VarChar, data.code)
    .query(
      "UPDATE DocumentTypes SET Name = @Name, Code = @Code WHERE TypeID = @TypeID"
    );
}

async function remove(id) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM DocumentTypes WHERE TypeID = @id");
}

module.exports = { getAll, create, update, remove };
