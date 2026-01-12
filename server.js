require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());

// Import Routes
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
try {
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
} catch (error) {
  console.error("Error loading routes:", error);
}

app.get("/", (req, res) => {
  res.send("API Portal is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại: http://localhost:${port}`);
});
