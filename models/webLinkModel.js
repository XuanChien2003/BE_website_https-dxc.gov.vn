const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY DANH SÁCH
async function getAllLinks() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM WebLinks ORDER BY STT ASC, LinkID DESC");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 2. THÊM MỚI
async function createLink(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO WebLinks (Name, Url, ImageLink, Description, STT, IsShow)
      VALUES (@Name, @Url, @ImageLink, @Description, @STT, @IsShow)
    `;

    await pool
      .request()
      .input("Name", sql.NVarChar, data.name)
      .input("Url", sql.NVarChar, data.url)
      .input("ImageLink", sql.NVarChar, data.imageLink || "")
      .input("Description", sql.NVarChar, data.description || "")
      .input("STT", sql.Int, data.stt || 0)
      .input("IsShow", sql.Bit, data.isShow ? 1 : 0)
      .query(query);

    return { message: "Web link created successfully" };
  } catch (error) {
    throw error;
  }
}

// 3. CẬP NHẬT
async function updateLink(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE WebLinks 
      SET Name = @Name, 
          Url = @Url, 
          ImageLink = @ImageLink, 
          Description = @Description, 
          STT = @STT, 
          IsShow = @IsShow
      WHERE LinkID = @LinkID
    `;

    await pool
      .request()
      .input("LinkID", sql.Int, id)
      .input("Name", sql.NVarChar, data.name)
      .input("Url", sql.NVarChar, data.url)
      .input("ImageLink", sql.NVarChar, data.imageLink)
      .input("Description", sql.NVarChar, data.description)
      .input("STT", sql.Int, data.stt)
      .input("IsShow", sql.Bit, data.isShow ? 1 : 0)
      .query(query);

    return { message: "Web link updated successfully" };
  } catch (error) {
    throw error;
  }
}

// 4. XÓA
async function deleteLink(id) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("LinkID", sql.Int, id)
      .query("DELETE FROM WebLinks WHERE LinkID = @LinkID");
    return { message: "Web link deleted successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllLinks,
  createLink,
  updateLink,
  deleteLink,
};
