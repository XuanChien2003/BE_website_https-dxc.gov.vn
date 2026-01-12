const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "chuoi_bi_mat_khong_duoc_tiet_lo";

exports.register = async (req, res) => {
  try {
    const { username, password, fullName, role } = req.body;

    // 1. Kiểm tra xem user đã tồn tại chưa
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    // 2. Mã hóa mật khẩu (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Gọi Model để lưu vào DB
    const newUser = {
      username,
      password: hashedPassword,
      fullName,
      role,
    };

    await userModel.createUser(newUser);
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Tìm user trong DB
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // 2. So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // 3. Tạo Token (JWT)
    const token = jwt.sign(
      {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 4. Trả về Token và thông tin cơ bản
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.UserID,
        username: user.Username,
        fullName: user.FullName,
        role: user.Role,
        avatar: user.Avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
