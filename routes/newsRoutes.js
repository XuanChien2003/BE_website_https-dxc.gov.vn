const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const {authorize} = require("../middleware/authorize");

router.get("/", newsController.getList);
router.get("/:id", newsController.getDetail);
router.post("/", authorize(['admin']), newsController.create);
router.put("/:id", authorize(['admin']), newsController.update);
router.delete("/:id", authorize(['admin']), newsController.delete);

module.exports = router;
