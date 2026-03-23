const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY DANH SÁCH
async function getAllNews() {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT n.*, c.Title as CategoryName 
      FROM News n
      LEFT JOIN Categories c ON n.CategoryID = c.CategoryID
      ORDER BY n.PublishedDate DESC
    `;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 2. LẤY CHI TIẾT
async function getNewsById(id) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("NewsID", sql.Int, id)
      .query("SELECT * FROM News WHERE NewsID = @NewsID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

async function createNews(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO News (
        Title, ImageLink, Summary, Content, CategoryID, 
        PublishedDate, IsFeatured, Note, CreatedBy, NewsStatus
      )
      VALUES (
        @Title, @ImageLink, @Summary, @Content, @CategoryID, 
        GETDATE(), @IsFeatured, @Note, @CreatedBy, @NewsStatus
      )
    `;

    await pool
      .request()
      .input("Title", sql.NVarChar, data.title)
      .input("ImageLink", sql.NVarChar, data.imageLink)
      .input("Summary", sql.NVarChar, data.summary)
      .input("Content", sql.NVarChar, data.content)
      .input("CategoryID", sql.Int, data.categoryID)
      .input("IsFeatured", sql.Bit, data.isFeatured ? 1 : 0)
      .input("Note", sql.NVarChar, data.note)
      .input("CreatedBy", sql.NVarChar, data.createdBy || "Admin")
      .input("NewsStatus", sql.NVarChar, data.newsStatus || "Chờ duyệt")
      .query(query);

    return { message: "Thêm tin tức thành công!" };
  } catch (error) {
    throw error;
  }
}

async function updateNews(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE News 
      SET Title = @Title, 
          ImageLink = @ImageLink, 
          Summary = @Summary, 
          Content = @Content, 
          CategoryID = @CategoryID,
          IsFeatured = @IsFeatured,
          Note = @Note,
          UpdatedBy = @UpdatedBy,
          NewsStatus = @NewsStatus 
      WHERE NewsID = @NewsID
    `;

    await pool
      .request()
      .input("NewsID", sql.Int, id)
      .input("Title", sql.NVarChar, data.title)
      .input("ImageLink", sql.NVarChar, data.imageLink)
      .input("Summary", sql.NVarChar, data.summary)
      .input("Content", sql.NVarChar, data.content)
      .input("CategoryID", sql.Int, data.categoryID)
      .input("IsFeatured", sql.Bit, data.isFeatured ? 1 : 0)
      .input("Note", sql.NVarChar, data.note)
      .input("UpdatedBy", sql.NVarChar, data.updatedBy || "Admin")
      .input("NewsStatus", sql.NVarChar, data.newsStatus)
      .query(query);

    return { message: "Cập nhật tin tức thành công!" };
  } catch (error) {
    throw error;
  }
}

// 5. XÓA
async function deleteNews(id) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("NewsID", sql.Int, id)
      .query("DELETE FROM News WHERE NewsID = @NewsID");
    return { message: "Xóa tin tức thành công!" };
  } catch (error) {
    throw error;
  }
}

// 6. LẤY DANH SÁCH TIN GẦN ĐÂY DÀNH CHO CONTEXT CỦA AI
async function getRecentNewsContext() {
  try {
    const pool = await sql.connect(config);
    // Lấy 10 bài viết mới nhất có tiêu đề và tóm tắt
    const result = await pool
      .request()
      .query("SELECT TOP 10 Title, Summary FROM News ORDER BY PublishedDate DESC");
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getRecentNewsContext,
};
