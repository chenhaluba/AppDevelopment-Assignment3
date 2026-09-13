const Book = require("../models/book");

const stages = [
    {
        id: 1,
        title: "Get all books",
        description: "Display all books in the library.",
        fields: []
    },
    {
        id: 2,
        title: "Get one book",
        description: "Display the book with id 2.",
        fields: ["route"]
    },
    {
        id: 3,
        title: "Filter and sort books",
        description: "Display only Fantasy books and sort them by price.",
        fields: ["query"]
    },
    {
        id: 4,
        title: "Add a new book",
        description: "Add a new book: Dune, authorId 1, category Sci-Fi, price 80.",
        fields: ["body"]
    },
    {
        id: 5,
        title: "Update a book",
        description: "Update book 1 with: The Hobbit, authorId 1, category Fantasy, price 65.",
        fields: ["route", "body"]
    },
    {
        id: 6,
        title: "Delete a book",
        description: "Delete book 4.",
        fields: ["route"]
    },
    {
        id: 7,
        title: "Books by author",
        description: "Display all books written by author 2 and sort them by price.",
        fields: ["route", "query"]
    },
    {
        id: 8,
        title: "Handle an error",
        description: "Request book 999, which does not exist, and inspect the server response.",
        fields: ["route"]
    }
];

const schemas = [
    {
        resource: "Book",
        fields: [
            { name: "id", type: "number" },
            { name: "title", type: "string" },
            { name: "authorId", type: "number" },
            { name: "category", type: "string" },
            { name: "price", type: "number" }
        ]
    },
    {
        resource: "Author",
        fields: [
            { name: "id", type: "number" },
            { name: "name", type: "string" },
            { name: "country", type: "string" }
        ]
    }
];

const renderGame = function(req, res) {
    res.render("index", { stages: stages });
};

const renderSchemas = function(req, res) {
    res.render("schemas", { schemas: schemas });
};

const restartGame = function(req, res) {
    Book.reset();

    res.status(200).json({
        message: "Game restarted."
    });
};

module.exports = {
    renderGame,
    renderSchemas,
    restartGame
};
