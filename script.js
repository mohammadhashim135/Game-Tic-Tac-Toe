// Byte Maze Hashim

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(index) {
    if (gameOver || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderGame();

    if (checkWin(currentPlayer)) {
        gameOver = true;
        document.getElementById('status').innerText = currentPlayer + ' wins!';
        document.getElementById('gameBoard').classList.add('winner');
        setTimeout(() => {
            resetGame();
        }, 1500);
    } else if (checkDraw()) {
        gameOver = true;
        document.getElementById('status').innerText = 'It\'s a draw!';
        setTimeout(() => {
            resetGame();
        }, 1500);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
        if (currentPlayer === 'O' && !gameOver) {
            setTimeout(makeComputerMove, 500); // Delay for computer move
        }
    }
}

function makeComputerMove() {
    // First, check if there's a winning move for the computer
    let computerMoveIndex = getWinningMoveIndex('O');
    
    // If there's no winning move, check if the player is about to win and block them
    if (computerMoveIndex === -1) {
        computerMoveIndex = getWinningMoveIndex('X');
    }
    
    // If no winning or blocking move, make a random move
    if (computerMoveIndex === -1) {
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        computerMoveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    makeMove(computerMoveIndex);
}

function getWinningMoveIndex(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // Check each winning condition to find a winning move or blocking move
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') {
            return c;
        }
        if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') {
            return b;
        }
        if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') {
            return a;
        }
    }
    
    return -1; // No winning or blocking move found
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winConditions.some(condition => {
        return condition.every(index => gameBoard[index] === player);
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    updateStatus();
    document.getElementById('gameBoard').classList.remove('winner');
    renderGame();
}

function renderGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = gameBoard[index];
    });
}

function updateStatus() {
    document.getElementById('status').innerText = (gameOver ? '' : currentPlayer + '\'s turn');
}



updateStatus(); // Initial status message
renderGame();  // Initial game board display


let backgroundMusic = new Audio('bgs.mp3');

function toggleBackgroundMusic() {
    const musicToggle = document.getElementById('music-toggle');
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.setAttribute('aria-checked', 'true');
    } else {
        backgroundMusic.pause();
        musicToggle.setAttribute('aria-checked', 'false');
    }
}
