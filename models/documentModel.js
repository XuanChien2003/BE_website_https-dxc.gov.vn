const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. LẤY CHI TIẾT
async function getDocumentById(id) {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT d.*, 
        a.Name AS AgencyName,
        s.Name AS SignerName,
        dt.Name AS TypeName,
        f.Name AS FieldName
      FROM Documents d
      LEFT JOIN Agencies a ON d.AgencyID = a.AgencyID
      LEFT JOIN Signers s ON d.SignerID = s.SignerID
      LEFT JOIN DocumentTypes dt ON d.TypeID = dt.TypeID
      LEFT JOIN Fields f ON d.FieldID = f.FieldID
      WHERE d.DocID = @DocID
    `;
    const result = await pool
      .request()
      .input("DocID", sql.Int, id)
      .query(query);
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

// 2. LẤY DANH SÁCH
async function getAllDocuments() {
  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT d.*, 
        a.Name AS AgencyName,
        s.Name AS SignerName,
        dt.Name AS TypeName,
        f.Name AS FieldName
      FROM Documents d
      LEFT JOIN Agencies a ON d.AgencyID = a.AgencyID
      LEFT JOIN Signers s ON d.SignerID = s.SignerID
      LEFT JOIN DocumentTypes dt ON d.TypeID = dt.TypeID
      LEFT JOIN Fields f ON d.FieldID = f.FieldID
      ORDER BY d.IssueDate DESC
    `;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

// 3. THÊM MỚI (Không insert DocID)
async function createDocument(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO Documents (
        DocNumber, IssueDate, EffectiveDate, Title, Link, 
        AgencyID, SignerID, TypeID, FieldID, 
        PublishStatus, CreatedBy, UpdatedBy
      )
      VALUES (
        @DocNumber, @IssueDate, @EffectiveDate, @Title, @Link, 
        @AgencyID, @SignerID, @TypeID, @FieldID, 
        @PublishStatus, @CreatedBy, @CreatedBy
      )
    `;

    await pool
      .request()
      .input("DocNumber", sql.NVarChar, data.docNumber)
      .input("IssueDate", sql.Date, data.issueDate)
      .input("EffectiveDate", sql.Date, data.effectiveDate)
      .input("Title", sql.NVarChar, data.title)
      .input("Link", sql.NVarChar, data.link)
      .input("AgencyID", sql.Int, data.agencyID)
      .input("SignerID", sql.Int, data.signerID)
      .input("TypeID", sql.Int, data.typeID)
      .input("FieldID", sql.Int, data.fieldID)
      .input("PublishStatus", sql.NVarChar, data.publishStatus || "Đã xuất bản")
      .input("CreatedBy", sql.NVarChar, "Admin")
      .query(query);

    return { message: "Thêm mới thành công" };
  } catch (error) {
    throw error;
  }
}

// 4. CẬP NHẬT
async function updateDocument(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Documents
      SET 
        DocNumber = @DocNumber,
        IssueDate = @IssueDate,
        EffectiveDate = @EffectiveDate,
        Title = @Title,
        Link = @Link,
        AgencyID = @AgencyID,
        SignerID = @SignerID,
        TypeID = @TypeID,
        FieldID = @FieldID,
        PublishStatus = @PublishStatus,
        UpdatedBy = @UpdatedBy
      WHERE DocID = @DocID
    `;

    await pool
      .request()
      .input("DocID", sql.Int, id)
      .input("DocNumber", sql.NVarChar, data.docNumber)
      .input("IssueDate", sql.Date, data.issueDate)
      .input("EffectiveDate", sql.Date, data.effectiveDate)
      .input("Title", sql.NVarChar, data.title)
      .input("Link", sql.NVarChar, data.link)
      .input("AgencyID", sql.Int, data.agencyID)
      .input("SignerID", sql.Int, data.signerID)
      .input("TypeID", sql.Int, data.typeID)
      .input("FieldID", sql.Int, data.fieldID)
      .input("PublishStatus", sql.NVarChar, data.publishStatus || "Đã xuất bản")
      .input("UpdatedBy", sql.NVarChar, "Admin")
      .query(query);

    return { message: "Cập nhật thành công" };
  } catch (error) {
    throw error;
  }
}

// 5. XÓA
async function deleteDocument(id) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("DocID", sql.Int, id)
      .query("DELETE FROM Documents WHERE DocID = @DocID");
    return { message: "Xóa thành công" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  createDocument,
};
