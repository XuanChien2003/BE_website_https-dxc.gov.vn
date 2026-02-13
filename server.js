require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cookieParser())


//import middleware
const {checkAuthenticate} = require("./middleware/authenticate")

// Cấu hình CORS chấp nhận mọi nguồn (hoặc sửa thành domain FE của bạn)
app.use(
  cors({
    origin: process.env.URL_FRONTEND || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(express.json());
//middleware
app.use(checkAuthenticate)

const limiter = rateLimit(
  {
    windowMs: 1*60*1000,
    max: 100,
    message: "Truy van qua nhieu request trong 1 phut"
  }
)

app.use(limiter)

// Import Routes
// Lưu ý: Đảm bảo folder 'routes' nằm TRONG folder 'BE' cùng với file server.js này
const documentRoutes = require("./routes/documentRoutes");
const newsRoutes = require("./routes/newsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const dictionaryRoutes = require("./routes/dictionaryRoutes");
const menuRoutes = require("./routes/menuRoutes");
const slideRoutes = require("./routes/slideRoutes");
const webLinkRoutes = require("./routes/webLinkRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");


// Use Routes
// Thêm tiền tố /api để dễ quản lý routes (Optional, nhưng khuyên dùng)
// Nếu dùng như code cũ thì giữ nguyên, nhưng nhớ check kỹ đường dẫn gọi từ FE
app.use("/documents", documentRoutes);
app.use("/news", newsRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/dictionaries", dictionaryRoutes);
app.use("/menus", menuRoutes);
app.use("/slides", slideRoutes);
app.use("/weblinks", webLinkRoutes);
app.use("/users", userRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("API Portal is running on Vercel...");
});

// Xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


// Quan trọng: Export app thay vì listen
module.exports = app;
