const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// 1. LẤY CHI TIẾT
exports.getDetail = async (req, res) => {
  try {
    const data = await userModel.getUserById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. TẠO MỚI
exports.create = async (req, res) => {
  try {
    const { username, password, fullName, role, avatar } = req.body;

    // Validate cơ bản
    if (!username || !password || !fullName) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.createUser({
      username,
      password: hashedPassword,
      fullName,
      role: role || "user",
      avatar: avatar || "",
    });

    res.status(201).json({ message: "Tạo người dùng thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. CẬP NHẬT INFO (Không đổi pass)
exports.update = async (req, res) => {
  try {
    const { fullName, role, avatar } = req.body;

    // Lấy thông tin cũ để giữ nguyên nếu không gửi lên
    const oldUser = await userModel.getUserById(req.params.id);
    if (!oldUser) return res.status(404).json({ message: "User not found" });

    // Gọi Model với dữ liệu mới hoặc giữ cũ
    await userModel.updateUser(req.params.id, {
      fullName: fullName || oldUser.FullName,
      role: role || oldUser.Role,
      avatar: avatar || oldUser.Avatar,
    });

    res.json({ message: "Cập nhật thông tin thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. ĐỔI MẬT KHẨU
exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu phải từ 6 ký tự!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.changePassword(req.params.id, hashedPassword);
    res.json({ message: "Đổi mật khẩu thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. XÓA
exports.delete = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: "Xóa người dùng thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
