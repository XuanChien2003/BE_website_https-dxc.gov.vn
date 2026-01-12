const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

//Lấy danh sách
router.get("/", documentController.getList);

//Xem chi tiết
router.get("/:id", documentController.getDetail);

//Sửa văn bản
router.put("/:id", documentController.update);

//Xóa văn bản
router.delete("/:id", documentController.delete);
//Tạo mới văn bản
router.post("/", documentController.create);

module.exports = router;
