const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const {authorize} = require("../middleware/authorize");

//Lấy danh sách
router.get("/", documentController.getList);

//Xem chi tiết
router.get("/:id", documentController.getDetail);

//Sửa văn bản
router.put("/:id", authorize(['admin']), documentController.update);

//Xóa văn bản
router.delete("/:id", authorize(['admin']), documentController.delete);
//Tạo mới văn bản
router.post("/", authorize(['admin']), documentController.create);

module.exports = router;
