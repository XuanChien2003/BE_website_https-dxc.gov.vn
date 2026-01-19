const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY DANH SÁCH
async function getAllCategories() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM Categories ORDER BY STT ASC, Title ASC");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 2. LẤY CHI TIẾT
async function getCategoryById(id) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("CategoryID", sql.Int, id)
      .query("SELECT * FROM Categories WHERE CategoryID = @CategoryID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

// 3. TẠO MỚI
async function createCategory(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO Categories (Title, Description, STT, ParentID, Status)
      VALUES (@Title, @Description, @STT, @ParentID, @Status)
    `;

    await pool
      .request()
      .input("Title", sql.NVarChar, data.title)
      .input("Description", sql.NVarChar, data.description || "")
      .input("STT", sql.Int, data.stt || 0)
      .input("ParentID", sql.Int, data.parentID || 0)
      .input("Status", sql.VarChar, data.status || "active")
      .query(query);

    return { message: "Created successfully" };
  } catch (error) {
    throw error;
  }
}

// 4. CẬP NHẬT
async function updateCategory(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Categories 
      SET Title = @Title, 
          Description = @Description, 
          STT = @STT, 
          ParentID = @ParentID, 
          Status = @Status
      WHERE CategoryID = @CategoryID
    `;

    await pool
      .request()
      .input("CategoryID", sql.Int, id)
      .input("Title", sql.NVarChar, data.title)
      .input("Description", sql.NVarChar, data.description || "")
      .input("STT", sql.Int, data.stt)
      .input("ParentID", sql.Int, data.parentID)
      .input("Status", sql.VarChar, data.status || "active")
      .query(query);

    return { message: "Updated successfully" };
  } catch (error) {
    throw error;
  }
}

// 5. XÓA
async function deleteCategory(id) {
  try {
    const pool = await sql.connect(config);
    const checkChild = await pool
      .request()
      .input("ID", sql.Int, id)
      .query("SELECT TOP 1 * FROM Categories WHERE ParentID = @ID");

    if (checkChild.recordset.length > 0) {
      throw new Error(
        "Không thể xóa: Chuyên mục này đang chứa chuyên mục con!"
      );
    }

    await pool
      .request()
      .input("CategoryID", sql.Int, id)
      .query("DELETE FROM Categories WHERE CategoryID = @CategoryID");

    return { message: "Deleted successfully" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
