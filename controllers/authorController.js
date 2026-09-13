const Author = require("../models/author");
const Book = require("../models/book");

const getAuthorBooks = function(req, res) {
    const authorId = Number(req.params.id);
    const author = Author.getById(authorId);

    if (!author) {
        return res.status(404).json({
            correct: false,
            message: "Author not found."
        });
    }

    let books = Book.getByAuthorId(authorId);

    if (req.query.sort === "price") {
        books.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    res.status(200).json({
        correct: true,
        message: "Correct request.",
        data: {
            author: author,
            books: books
        }
    });
};

module.exports = {
    getAuthorBooks
};
