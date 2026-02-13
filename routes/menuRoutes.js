const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const {authorize} = require("../middleware/authorize");

// Lấy danh sách menu
router.get("/", menuController.getList);

// Thêm mới menu
router.post("/", authorize(['admin']), menuController.create);

// Cập nhật menu theo ID
router.put("/:id", authorize(['admin']), menuController.update);

// Xóa menu theo ID
router.delete("/:id", authorize(['admin']), menuController.delete);

module.exports = router;
