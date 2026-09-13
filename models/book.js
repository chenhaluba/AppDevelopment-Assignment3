const initialBooks = [
    { id: 1, title: "The Hobbit", authorId: 1, category: "Fantasy", price: 60 },
    { id: 2, title: "1984", authorId: 2, category: "Dystopian", price: 45 },
    { id: 3, title: "Harry Potter", authorId: 3, category: "Fantasy", price: 75 },
    { id: 4, title: "Animal Farm", authorId: 2, category: "Classic", price: 35 }
];

let books = [];

const reset = function() {
    books = initialBooks.map(function(book) {
        return { ...book };
    });
};

const getAll = function() {
    return books;
};

const getById = function(id) {
    return books.find(function(book) {
        return book.id === id;
    });
};

const create = function(bookData) {
    const newId =
        books.length === 0
            ? 1
            : Math.max(...books.map(function(book) {
                return book.id;
            })) + 1;

    const newBook = {
        id: newId,
        title: bookData.title,
        authorId: Number(bookData.authorId),
        category: bookData.category,
        price: Number(bookData.price)
    };

    books.push(newBook);
    return newBook;
};

const update = function(id, bookData) {
    const book = getById(id);

    if (!book) {
        return null;
    }

    book.title = bookData.title;
    book.authorId = Number(bookData.authorId);
    book.category = bookData.category;
    book.price = Number(bookData.price);

    return book;
};

const remove = function(id) {
    const index = books.findIndex(function(book) {
        return book.id === id;
    });

    if (index === -1) {
        return null;
    }

    return books.splice(index, 1)[0];
};

const getByAuthorId = function(authorId) {
    return books.filter(function(book) {
        return book.authorId === authorId;
    });
};

reset();

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByAuthorId,
    reset
};
