const express = require("express");
const router = express.Router();
const slideController = require("../controllers/slideController");
const {authorize} = require("../middleware/authorize");

router.get("/", slideController.getList);
router.post("/", authorize(['admin']), slideController.create);
router.put("/:id", authorize(['admin']), slideController.update);
router.delete("/:id", authorize(['admin']), slideController.delete);

module.exports = router;
