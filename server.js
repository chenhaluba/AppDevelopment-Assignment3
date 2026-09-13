const express = require("express");
const path = require("path");

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const gameRoutes = require("./routes/gameRoutes");
const gameController = require("./controllers/gameController");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", gameController.renderGame);
app.get("/schemas", gameController.renderSchemas);

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/game", gameRoutes);

app.use("/api", function(req, res) {
    res.status(400).json({
        correct: false,
        message: "The HTTP method or request path is not correct for this stage."
    });
});

app.listen(PORT, function() {
    console.log("Server is running on http://localhost:" + PORT);
});
