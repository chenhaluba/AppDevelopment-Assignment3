const express = require("express");
const authorController = require("../controllers/authorController");
const stageController = require("../controllers/stageController");

const router = express.Router();

router.get(
    "/:id/books",
    stageController.checkStage,
    authorController.getAuthorBooks
);

module.exports = router;
