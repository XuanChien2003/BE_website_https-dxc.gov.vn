const express = require("express");
const router = express.Router();
const webLinkController = require("../controllers/webLinkController");
const {authorize} = require("../middleware/authorize");

router.get("/", webLinkController.getList);
router.post("/", authorize(['admin']), webLinkController.create);
router.put("/:id", authorize(['admin']), webLinkController.update);
router.delete("/:id", authorize(['admin']), webLinkController.delete);

module.exports = router;
