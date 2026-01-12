const express = require("express");
const router = express.Router();
const slideController = require("../controllers/slideController");

router.get("/", slideController.getList);
router.post("/", slideController.create);
router.put("/:id", slideController.update);
router.delete("/:id", slideController.delete);

module.exports = router;
