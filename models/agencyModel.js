const sql = require("mssql");
const config = require("../config/dbConfig");

async function getAll() {
  const pool = await sql.connect(config);
  const result = await pool.request().query("SELECT * FROM Agencies");
  return result.recordset;
}

async function create(data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("Name", sql.NVarChar, data.name)
    // Nếu data.isDefault là true thì lưu 1, ngược lại lưu 0
    .input("IsDefault", sql.Bit, data.isDefault ? 1 : 0)
    .query("INSERT INTO Agencies (Name, IsDefault) VALUES (@Name, @IsDefault)");
}

async function update(id, data) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("AgencyID", sql.Int, id)
    .input("Name", sql.NVarChar, data.name)
    .input("IsDefault", sql.Bit, data.isDefault ? 1 : 0)
    .query(
      "UPDATE Agencies SET Name = @Name, IsDefault = @IsDefault WHERE AgencyID = @AgencyID"
    );
}

async function remove(id) {
  const pool = await sql.connect(config);
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Agencies WHERE AgencyID = @id");
}

module.exports = { getAll, create, update, remove };
