const express = require("express");
const router = express.Router();
const {authorize} = require("../middleware/authorize");

const aiController = require("../controllers/aiController");

router.post("/generate", authorize(['admin']),aiController.generateHTML);
router.post("/chat", aiController.chatWithAI);

module.exports = router;
