const stages = JSON.parse(
    document.getElementById("stagesData").textContent
);

let currentStage = Number(sessionStorage.getItem("currentStage")) || 0;

const stageNumber = document.getElementById("stageNumber");
const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");

const method = document.getElementById("method");
const path = document.getElementById("path");
const route = document.getElementById("route");
const query = document.getElementById("query");
const body = document.getElementById("body");

const routeGroup = document.getElementById("routeGroup");
const queryGroup = document.getElementById("queryGroup");
const bodyGroup = document.getElementById("bodyGroup");

const sendBtn = document.getElementById("sendBtn");
const nextBtn = document.getElementById("nextBtn");

const status = document.getElementById("status");
const message = document.getElementById("message");
const result = document.getElementById("result");

const completionModal = document.getElementById("completionModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const restartBtn = document.getElementById("restartBtn");

const showStage = () => {
    const stage = stages[currentStage];

    sessionStorage.setItem("currentStage", currentStage);

    stageNumber.textContent =
        `Stage ${currentStage + 1} of ${stages.length}`;

    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;

    routeGroup.classList.toggle(
        "hidden",
        !stage.fields.includes("route")
    );

    queryGroup.classList.toggle(
        "hidden",
        !stage.fields.includes("query")
    );

    bodyGroup.classList.toggle(
        "hidden",
        !stage.fields.includes("body")
    );
};

const resetStageFields = () => {
    method.value = "GET";
    path.value = "";
    route.value = "";
    query.value = "";
    body.value = "";

    status.textContent = "-";
    status.className = "status";

    message.textContent =
        "Send a request to see the server response.";
    message.className = "message";

    result.textContent = "{}";

    nextBtn.classList.add("hidden");
    completionModal.classList.add("hidden");
};

const saveGameState = () => {
    const state = {
        stage: currentStage,
        method: method.value,
        path: path.value,
        route: route.value,
        query: query.value,
        body: body.value,
        statusText: status.textContent,
        statusClass: status.className,
        messageText: message.textContent,
        messageClass: message.className,
        resultText: result.textContent,
        nextVisible: !nextBtn.classList.contains("hidden"),
        modalVisible: !completionModal.classList.contains("hidden")
    };

    sessionStorage.setItem(
        "gameState",
        JSON.stringify(state)
    );
};

const restoreGameState = () => {
    const savedState = sessionStorage.getItem("gameState");

    if (!savedState) {
        resetStageFields();
        return;
    }

    const state = JSON.parse(savedState);

    if (state.stage !== currentStage) {
        resetStageFields();
        return;
    }

    method.value = state.method;
    path.value = state.path;
    route.value = state.route;
    query.value = state.query;
    body.value = state.body;

    status.textContent = state.statusText;
    status.className = state.statusClass;

    message.textContent = state.messageText;
    message.className = state.messageClass;

    result.textContent = state.resultText;

    nextBtn.classList.toggle(
        "hidden",
        !state.nextVisible
    );

    completionModal.classList.toggle(
        "hidden",
        !state.modalVisible
    );
};

const buildUrl = () => {
    let url = path.value.trim();

    if (route.value.trim()) {
        const [key, value] = route.value.split("=");

        if (key && value) {
            url = url.replace(
                `:${key.trim()}`,
                value.trim()
            );
        }
    }

    if (query.value.trim()) {
        url += `?${query.value.trim()}`;
    }

    return url;
};

method.addEventListener("change", saveGameState);
path.addEventListener("input", saveGameState);
route.addEventListener("input", saveGameState);
query.addEventListener("input", saveGameState);
body.addEventListener("input", saveGameState);

sendBtn.addEventListener("click", async () => {
    const url = buildUrl();

    if (!path.value.trim()) {
        message.textContent = "Please enter a request path.";
        message.className = "message error";
        saveGameState();
        return;
    }

    if (url.includes(":")) {
        message.textContent =
            "Please enter the required Route Parameters.";
        message.className = "message error";
        saveGameState();
        return;
    }

    const options = {
        method: method.value,
        headers: {
            "Content-Type": "application/json",
            "x-stage-id": stages[currentStage].id
        }
    };

    if (body.value.trim()) {
        try {
            options.body = JSON.stringify(
                JSON.parse(body.value)
            );
        } catch {
            message.textContent =
                "Request Body must be valid JSON.";
            message.className = "message error";
            saveGameState();
            return;
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        status.textContent =
            `${response.status} ${response.statusText}`;

        status.className = response.ok
            ? "status success-status"
            : "status error-status";

        message.textContent = data.message;
        result.textContent = JSON.stringify(data, null, 2);

        if (data.correct) {
            message.className = "message success";

            if (currentStage === stages.length - 1) {
                completionModal.classList.remove("hidden");
            } else {
                nextBtn.classList.remove("hidden");
            }
        } else {
            message.className = "message error";
            nextBtn.classList.add("hidden");
        }

        saveGameState();

    } catch {
        status.textContent = "Error";
        status.className = "status error-status";

        message.textContent = "Could not send the request.";
        message.className = "message error";

        saveGameState();
    }
});

nextBtn.addEventListener("click", () => {
    currentStage++;

    sessionStorage.setItem(
        "currentStage",
        currentStage
    );

    sessionStorage.removeItem("gameState");

    showStage();
    resetStageFields();
    saveGameState();
});

closeModalBtn.addEventListener("click", () => {
    completionModal.classList.add("hidden");
    saveGameState();
});

restartBtn.addEventListener("click", async () => {
    await fetch("/api/game/restart", {
        method: "POST"
    });

    currentStage = 0;

    sessionStorage.setItem(
        "currentStage",
        currentStage
    );

    sessionStorage.removeItem("gameState");

    showStage();
    resetStageFields();
    saveGameState();
});

showStage();
restoreGameState();
