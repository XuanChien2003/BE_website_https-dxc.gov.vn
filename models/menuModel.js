const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY DANH SÁCH MENU (Sắp xếp theo STT)
async function getAllMenus() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM Menus ORDER BY STT ASC, Title ASC");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 2. THÊM MENU MỚI
async function createMenu(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO Menus (Title, Url, STT, IsShow, ParentID, Position)
      VALUES (@Title, @Url, @STT, @IsShow, @ParentID, @Position)
    `;
    await pool
      .request()
      .input("Title", sql.NVarChar, data.title)
      .input("Url", sql.NVarChar, data.url)
      .input("STT", sql.Int, data.stt || 0)
      .input("IsShow", sql.Bit, data.isShow ? 1 : 0)
      .input("ParentID", sql.Int, data.parentID || 0)
      .input("Position", sql.VarChar, data.position || "Main")
      .query(query);
    return { message: "Thêm menu thành công!" };
  } catch (error) {
    throw error;
  }
}

// 3. CẬP NHẬT MENU
async function updateMenu(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Menus 
      SET Title = @Title, 
          Url = @Url, 
          STT = @STT, 
          IsShow = @IsShow, 
          ParentID = @ParentID,
          Position = @Position
      WHERE MenuID = @MenuID
    `;
    await pool
      .request()
      .input("MenuID", sql.Int, id)
      .input("Title", sql.NVarChar, data.title)
      .input("Url", sql.NVarChar, data.url)
      .input("STT", sql.Int, data.stt)
      .input("IsShow", sql.Bit, data.isShow ? 1 : 0)
      .input("ParentID", sql.Int, data.parentID)
      .input("Position", sql.VarChar, data.position || "Main")
      .query(query);
    return { message: "Cập nhật menu thành công!" };
  } catch (error) {
    throw error;
  }
}

// 4. XÓA MENU (Có kiểm tra menu con)
async function deleteMenu(id) {
  try {
    const pool = await sql.connect(config);
    const checkChild = await pool
      .request()
      .input("ID", sql.Int, id)
      .query("SELECT TOP 1 * FROM Menus WHERE ParentID = @ID");

    if (checkChild.recordset.length > 0) {
      throw new Error("Không thể xóa: Menu này đang chứa menu con!");
    }

    await pool
      .request()
      .input("MenuID", sql.Int, id)
      .query("DELETE FROM Menus WHERE MenuID = @MenuID");

    return { message: "Xóa menu thành công!" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
};
