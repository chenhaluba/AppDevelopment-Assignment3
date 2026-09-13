const checkStage = (req, res, next) => {
    const stageId = Number(req.headers["x-stage-id"]);
    let correct = false;

    if (stageId === 1) {
        correct =
            req.method === "GET" &&
            req.baseUrl === "/api/books" &&
            req.path === "/";
    }

    if (stageId === 2) {
        correct =
            req.method === "GET" &&
            req.baseUrl === "/api/books" &&
            Number(req.params.id) === 2;
    }

    if (stageId === 3) {
        correct =
            req.method === "GET" &&
            req.baseUrl === "/api/books" &&
            req.path === "/" &&
            req.query.category === "Fantasy" &&
            req.query.sort === "price";
    }

    if (stageId === 4) {
        correct =
            req.method === "POST" &&
            req.baseUrl === "/api/books" &&
            req.path === "/" &&
            req.body.title === "Dune" &&
            Number(req.body.authorId) === 1 &&
            req.body.category === "Sci-Fi" &&
            Number(req.body.price) === 80;
    }

    if (stageId === 5) {
        correct =
            req.method === "PUT" &&
            req.baseUrl === "/api/books" &&
            Number(req.params.id) === 1 &&
            req.body.title === "The Hobbit" &&
            Number(req.body.authorId) === 1 &&
            req.body.category === "Fantasy" &&
            Number(req.body.price) === 65;
    }

    if (stageId === 6) {
        correct =
            req.method === "DELETE" &&
            req.baseUrl === "/api/books" &&
            Number(req.params.id) === 4;
    }

    if (stageId === 7) {
        correct =
            req.method === "GET" &&
            req.baseUrl === "/api/authors" &&
            Number(req.params.id) === 2 &&
            req.query.sort === "price";
    }

    if (stageId === 8) {
        correct =
            req.method === "GET" &&
            req.baseUrl === "/api/books" &&
            Number(req.params.id) === 999;
    }

    if (!correct) {
        return res.status(400).json({
            correct: false,
            message: "The request is not correct for this stage."
        });
    }

    next();
};

module.exports = {
    checkStage
};