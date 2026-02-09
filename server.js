require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Cấu hình CORS chấp nhận mọi nguồn (hoặc sửa thành domain FE của bạn)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
module.exports = app;
