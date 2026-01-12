const sql = require("mssql");
const config = require("../config/dbConfig");

async function getAll() {
  const pool = await sql.connect(config);
  return (await pool.request().query("SELECT * FROM Signers")).recordset;
}

async function create(data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("Name", sql.NVarChar, data.name)
    .query("INSERT INTO Signers (Name) VALUES (@Name)");
}

async function update(id, data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("SignerID", sql.Int, id)
    .input("Name", sql.NVarChar, data.name)
    .query("UPDATE Signers SET Name = @Name WHERE SignerID = @SignerID");
}

async function remove(id) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Signers WHERE SignerID = @id");
}

module.exports = { getAll, create, update, remove };
