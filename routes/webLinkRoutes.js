const express = require("express");
const router = express.Router();
const webLinkController = require("../controllers/webLinkController");

router.get("/", webLinkController.getList);
router.post("/", webLinkController.create);
router.put("/:id", webLinkController.update);
router.delete("/:id", webLinkController.delete);

module.exports = router;
