const authors = [
    { id: 1, name: "J.R.R. Tolkien", country: "UK" },
    { id: 2, name: "George Orwell", country: "UK" },
    { id: 3, name: "J.K. Rowling", country: "UK" }
];

const getAll = function() {
    return authors;
};

const getById = function(id) {
    return authors.find(function(author) {
        return author.id === id;
    });
};

module.exports = {
    getAll,
    getById
};
