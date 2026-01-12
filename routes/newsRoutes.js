const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/", newsController.getList);
router.get("/:id", newsController.getDetail); // API xem chi tiết
router.post("/", newsController.create);
router.put("/:id", newsController.update);
router.delete("/:id", newsController.delete);

module.exports = router;
