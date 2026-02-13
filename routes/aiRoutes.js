const express = require("express");
const router = express.Router();
const {authorize} = require("../middleware/authorize");

const aiController = require("../controllers/aiController");

router.post("/generate", authorize(['admin']),aiController.generateHTML);

module.exports = router;
