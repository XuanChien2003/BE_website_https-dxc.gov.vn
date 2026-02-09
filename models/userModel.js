const sql = require("mssql");
const config = require("../config/dbConfig");

// 1. Lấy thông tin user theo username (Dùng cho Login)
async function getUserByUsername(username) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE Username = @Username");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

// 2. Lấy thông tin user theo ID (Dùng để lấy chi tiết profile)
async function getUserById(id) {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("UserID", sql.Int, id)
      .query(
        "SELECT UserID, Username, FullName, Role, Avatar FROM Users WHERE UserID = @UserID",
      );

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
}

// 3. Tạo user mới (Dùng cho Register)
async function createUser(data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      INSERT INTO Users (Username, Password, FullName, Role, Avatar)
      VALUES (@Username, @Password, @FullName, @Role, @Avatar)
    `;

    await pool
      .request()
      .input("Username", sql.VarChar, data.username)
      .input("Password", sql.VarChar, data.password)
      .input("FullName", sql.NVarChar, data.fullName)
      .input("Role", sql.VarChar, data.role || "user")
      .input("Avatar", sql.NVarChar, data.avatar || "")
      .query(query);

    return { message: "User created successfully" };
  } catch (error) {
    throw error;
  }
}

// 4. Cập nhật thông tin User (Tên, Quyền, Avatar)
async function updateUser(id, data) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Users
      SET FullName = @FullName,
          Role = @Role,
          Avatar = @Avatar
      WHERE UserID = @UserID
    `;

    await pool
      .request()
      .input("UserID", sql.Int, id)
      .input("FullName", sql.NVarChar, data.fullName)
      .input("Role", sql.VarChar, data.role)
      .input("Avatar", sql.NVarChar, data.avatar)
      .query(query);

    return { message: "User updated successfully" };
  } catch (error) {
    throw error;
  }
}

// 5. Đổi mật khẩu
async function changePassword(id, newPassword) {
  try {
    const pool = await sql.connect(config);
    const query = `
      UPDATE Users
      SET Password = @Password
      WHERE UserID = @UserID
    `;

    await pool
      .request()
      .input("UserID", sql.Int, id)
      .input("Password", sql.VarChar, newPassword)
      .query(query);

    return { message: "Password changed successfully" };
  } catch (error) {
    throw error;
  }
}

// 6. Xóa User (Nếu cần)
async function deleteUser(id) {
  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("UserID", sql.Int, id)
      .query("DELETE FROM Users WHERE UserID = @UserID");

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
}

// 7. Lấy danh sách toàn bộ người dùng (Dành cho trang quản trị)
async function getAllUsers() {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        "SELECT UserID, Username, FullName, Role, Avatar FROM Users ORDER BY UserID DESC",
      );
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  getAllUsers,
};
