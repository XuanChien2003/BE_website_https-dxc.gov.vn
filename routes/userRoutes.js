const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {authorize} = require("../middleware/authorize");

// Lấy chi tiết user
router.get("/:id", userController.getDetail);

// Tạo user mới
router.post("/", userController.create);

// Cập nhật thông tin cơ bản
router.put("/:id", userController.update);

// Đổi mật khẩu (API riêng)
router.put("/:id/password", userController.changePassword);

// Xóa user
router.delete("/:id", userController.delete);

module.exports = router;
