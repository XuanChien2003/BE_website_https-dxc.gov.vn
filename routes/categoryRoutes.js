const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {authorize} = require("../middleware/authorize");

router.get("/", categoryController.getList);
router.post("/", authorize(['admin']), categoryController.create);
router.put("/:id", authorize(['admin']), categoryController.update);
router.delete("/:id", authorize(['admin']), categoryController.delete);
router.get("/:id", categoryController.getDetail);

module.exports = router;
