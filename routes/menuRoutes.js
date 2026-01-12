const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Lấy danh sách menu
router.get("/", menuController.getList);

// Thêm mới menu
router.post("/", menuController.create);

// Cập nhật menu theo ID
router.put("/:id", menuController.update);

// Xóa menu theo ID
router.delete("/:id", menuController.delete);

module.exports = router;
