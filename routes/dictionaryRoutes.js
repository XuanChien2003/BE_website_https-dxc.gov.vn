const express = require("express");
const router = express.Router();

const agencyController = require("../controllers/agencyController");
const signerController = require("../controllers/signerController");
const typeController = require("../controllers/typeController");
const fieldController = require("../controllers/fieldController");

// --- 1. AGENCIES ---
router.get("/agencies", agencyController.getList);
router.post("/agencies", agencyController.create);
router.put("/agencies/:id", agencyController.update);
router.delete("/agencies/:id", agencyController.delete);

// --- 2. SIGNERS ---
router.get("/signers", signerController.getList);
router.post("/signers", signerController.create);
router.put("/signers/:id", signerController.update);
router.delete("/signers/:id", signerController.delete);

// --- 3. TYPES ---
router.get("/types", typeController.getList);
router.post("/types", typeController.create);
router.put("/types/:id", typeController.update);
router.delete("/types/:id", typeController.delete);

// --- 4. FIELDS ---
router.get("/fields", fieldController.getList);
router.post("/fields", fieldController.create);
router.put("/fields/:id", fieldController.update);
router.delete("/fields/:id", fieldController.delete);

module.exports = router;
