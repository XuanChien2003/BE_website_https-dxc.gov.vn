const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 });

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
    const accessToken = jwt.sign(
      {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: `${process.env.JWT_ACCESS_TTL}m` }
    );
    const refreshToken = jwt.sign(
      {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.JWT_REFRESH_TTL}d` }
    );

    // luu refresh Token vao cache
    const key = `refreshToken:${user.UserID}`
    myCache.set(key, refreshToken, Number(process.env.JWT_REFRESH_TTL) * 24 * 3600)
    const isProduction = process.env.NODE_ENV === "production";
    // Gui token trong cookie
    res.cookie('refreshToken',refreshToken, 
    {
      httpOnly: true,
      secure: isProduction,
      sameSite:  "none",
      maxAge: Number(process.env.JWT_REFRESH_TTL) * 24 * 3600 * 1000
    }
    )

    res.cookie('accessToken', accessToken, 
      {
        httpOnly: true,
        secure: isProduction,
        sameSite:  "none",
        maxAge: Number(process.env.JWT_ACCESS_TTL) * 60 * 1000
      }
    )

    // 4. Trả về Token và thông tin cơ bản
    res.json({
      message: "Đăng nhập thành công",
      token: accessToken,
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

exports.refresh = async (req, res) => {
  try{
  const refreshToken = req.cookies?.refreshToken;
  console.log(req.cookies)
  console.log("refresh")
  if(!refreshToken){
    console.log(req.cookies)
    console.log("ko co refreshtoken trong cookie")
    return res.status(401).json({
      status: false,
      message: "Đăng nhập lại"
    });
  }

  const info = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const user = await userModel.getUserById(info.id);

  if (!user){
    return res.status(404).json({
      status: false,
      message: "Không tồn tại user"
    })
  }

  const key = `refreshToken:${user.UserID}`
  const storedToken = myCache.get(key);

  if(!storedToken || refreshToken != storedToken){
    console.log("refresh token het han")
    return res.status(401).json({
      status: false,
      message: 'Đăng nhập lại'
    })
  }

   const accessToken = jwt.sign(
      {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: `${process.env.JWT_ACCESS_TTL}m` }
    );
    const newRefreshToken = jwt.sign(
      {
        id: user.UserID,
        username: user.Username,
        role: user.Role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.JWT_REFRESH_TTL}d` }
    );

  myCache.set(key, newRefreshToken, Number(process.env.JWT_REFRESH_TTL) * 24 * 60 * 60)
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie('refreshToken', newRefreshToken,
    {
      httpOnly: true,
      secure: isProduction,
      sameSite:  "none",
      maxAge: Number(process.env.JWT_REFRESH_TTL) * 24 * 3600 * 1000
    }
  )

  res.cookie('accessToken', accessToken, 
    {
      httpOnly: true,
      secure: isProduction,
      sameSite:  "none",
      maxAge: Number(process.env.JWT_ACCESS_TTL) * 60 * 1000
    }
  )
  
  return res.status(200).json({
    status: true,
    token: accessToken
  })
  } catch (err){
    console.log(err)
    return res.status(500).json({
            status: false,
            message: 'Internal server error.'
        })
  }
}
