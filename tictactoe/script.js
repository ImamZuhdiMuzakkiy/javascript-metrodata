let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const currentPlayerElement = document.getElementById("currentPlayer");
const gameStatusElement = document.getElementById("gameStatus");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

function initGame() {
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    updateScoresDisplay();
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute("data-cell");
    if (gameBoard[cellIndex] !== "" || !gameActive) {
        return;
    }

    makeMove(cellIndex, currentPlayer);
}

function makeMove(cellIndex, player) {
    gameBoard[cellIndex] = player;
    const cell = document.querySelector(`.cell[data-cell='${cellIndex}']`);
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
    cell.disabled = true;

    if (checkWinner()) {
        gameActive = false;
        highlightWinningCells();
        gameStatusElement.innerHTML = `<span class="winner-text"> Pemain ${currentPlayer} Menang! </span>`;
        scores[currentPlayer]++;
        updateScoresDisplay();
        return;
    }

    if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        gameStatusElement.innerHTML = `<span class="draw-text"> Seri! </span>`;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerElement.textContent = currentPlayer;
    currentPlayerElement.style.color = currentPlayer === "X" ? "rgb(255, 45, 45)" : "rgb(73, 73, 255)";
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.querySelector(`.cell[data-cell='${a}']`).classList.add("winner");
            document.querySelector(`.cell[data-cell='${b}']`).classList.add("winner");
            document.querySelector(`.cell[data-cell='${c}']`).classList.add("winner");
        }
    });
}

function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    currentPlayerElement.textContent = 'X';
    currentPlayerElement.style.color = 'rgb(255, 45, 45)';
    gameStatusElement.textContent = '';
}

function updateScoresDisplay() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

function addClickEffect(element) {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
        element.style.transform = "scale(1)";
    }, 100);
}

cells.forEach(cell => {
    cell.addEventListener("mousedown", () => addClickEffect(cell));
});

initGame();