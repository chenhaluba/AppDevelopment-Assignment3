const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();

router.post("/restart", gameController.restartGame);

module.exports = router;
