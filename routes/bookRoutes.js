const express = require("express");
const bookController = require("../controllers/bookController");
const stageController = require("../controllers/stageController");

const router = express.Router();

router.get("/", stageController.checkStage, bookController.getBooks);
router.get("/:id", stageController.checkStage, bookController.getBook);
router.post("/", stageController.checkStage, bookController.addBook);
router.put("/:id", stageController.checkStage, bookController.updateBook);
router.delete("/:id", stageController.checkStage, bookController.deleteBook);

module.exports = router;
