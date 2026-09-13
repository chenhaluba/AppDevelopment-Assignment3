const Book = require("../models/book");

const getBooks = function(req, res) {
    let books = Book.getAll().slice();

    if (req.query.category) {
        books = books.filter(function(book) {
            return book.category === req.query.category;
        });
    }

    if (req.query.sort === "price") {
        books.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    res.status(200).json({
        correct: true,
        message: "Correct request.",
        data: books
    });
};

const getBook = function(req, res) {
    const id = Number(req.params.id);
    const book = Book.getById(id);

    if (!book) {
        return res.status(404).json({
            correct: true,
            message: "Book not found. This is the expected response for this stage.",
            data: null
        });
    }

    res.status(200).json({
        correct: true,
        message: "Correct request.",
        data: book
    });
};

const addBook = function(req, res) {
    const newBook = Book.create(req.body);

    res.status(201).json({
        correct: true,
        message: "Book added successfully.",
        data: newBook
    });
};

const updateBook = function(req, res) {
    const id = Number(req.params.id);
    const book = Book.update(id, req.body);

    if (!book) {
        return res.status(404).json({
            correct: false,
            message: "Book not found."
        });
    }

    res.status(200).json({
        correct: true,
        message: "Book updated successfully.",
        data: book
    });
};

const deleteBook = function(req, res) {
    const id = Number(req.params.id);
    const deletedBook = Book.remove(id);

    if (!deletedBook) {
        return res.status(404).json({
            correct: false,
            message: "Book not found."
        });
    }

    res.status(200).json({
        correct: true,
        message: "Book deleted successfully.",
        data: deletedBook
    });
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};
