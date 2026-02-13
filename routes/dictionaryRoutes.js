const express = require("express");
const router = express.Router();

const agencyController = require("../controllers/agencyController");
const signerController = require("../controllers/signerController");
const typeController = require("../controllers/typeController");
const fieldController = require("../controllers/fieldController");
const {authorize} = require("../middleware/authorize");

// --- 1. AGENCIES ---
router.get("/agencies", agencyController.getList);
router.post("/agencies", authorize(['admin']), agencyController.create);
router.put("/agencies/:id", authorize(['admin']), agencyController.update);
router.delete("/agencies/:id", authorize(['admin']), agencyController.delete);

// --- 2. SIGNERS ---
router.get("/signers", signerController.getList);
router.post("/signers", authorize(['admin']), signerController.create);
router.put("/signers/:id", authorize(['admin']), signerController.update);
router.delete("/signers/:id", authorize(['admin']), signerController.delete);

// --- 3. TYPES ---
router.get("/types", typeController.getList);
router.post("/types", authorize(['admin']), typeController.create);
router.put("/types/:id", authorize(['admin']), typeController.update);
router.delete("/types/:id", authorize(['admin']), typeController.delete);

// --- 4. FIELDS ---
router.get("/fields", fieldController.getList);
router.post("/fields", authorize(['admin']), fieldController.create);
router.put("/fields/:id", authorize(['admin']), fieldController.update);
router.delete("/fields/:id", authorize(['admin']), fieldController.delete);

module.exports = router;
