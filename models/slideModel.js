const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY DANH SÁCH
async function getAllSlides() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM Slides ORDER BY ModifiedDate DESC");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 2. THÊM MỚI
async function createSlide(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO Slides (Name, ImageLink, Description, ModifiedDate)
      VALUES (@Name, @ImageLink, @Description, GETDATE())
    `;

    await pool
      .request()
      .input("Name", sql.NVarChar, data.name)
      .input("ImageLink", sql.NVarChar, data.imageLink)
      .input("Description", sql.NVarChar, data.description || "")
      .query(query);

    return { message: "Slide created successfully" };
  } catch (error) {
    throw error;
  }
}

// 3. CẬP NHẬT
async function updateSlide(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Slides 
      SET Name = @Name, 
          ImageLink = @ImageLink, 
          Description = @Description, 
          ModifiedDate = GETDATE()
      WHERE SlideID = @SlideID
    `;

    await pool
      .request()
      .input("SlideID", sql.Int, parseInt(id)) // Chuyển id sang số
      .input("Name", sql.NVarChar, data.name)
      .input("ImageLink", sql.NVarChar, data.imageLink)
      .input("Description", sql.NVarChar, data.description || "")
      .query(query);

    return { message: "Slide updated successfully" };
  } catch (error) {
    throw error;
  }
}

// 4. XÓA (Thêm parseInt id)
async function deleteSlide(id) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("SlideID", sql.Int, parseInt(id)) // Chuyển id sang số
      .query("DELETE FROM Slides WHERE SlideID = @SlideID");

    return { message: "Slide deleted successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
};
