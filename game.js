document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const betButton = document.getElementById('bet-button');
    const addMoneyButton = document.getElementById('add-money-button');
    const betAmountInput = document.getElementById('bet-amount');
    const totalMoneyDisplay = document.getElementById('total-money');
    const minesInput = document.getElementById('mines');

    let totalMoney = 0;
    let currentBet = 0;
    let minePositions = [];
    let gameActive = false;

    function updateTotalMoneyDisplay() {
        totalMoneyDisplay.textContent = totalMoney.toFixed(2);
    }

    function generateMines(rows, cols, numMines) {
        let positions = new Set();
        while (positions.size < numMines) {
            positions.add(Math.floor(Math.random() * (rows * cols)));
        }
        return Array.from(positions);
    }

    function initializeGame() {
        if (gameActive) {
            alert(`Congrats! You earned $${(currentBet - parseFloat(betAmountInput.value)).toFixed(2)} from this game.`);
            totalMoney += currentBet;
            updateTotalMoneyDisplay();
            resetGame();
            return;
        }

        currentBet = parseFloat(betAmountInput.value);
        if (currentBet <= 0 || currentBet > totalMoney) {
            alert('Invalid bet amount. Please enter a valid number.');
            return;
        }

        totalMoney -= currentBet;
        updateTotalMoneyDisplay();

        gameBoard.innerHTML = ''; // Clear previous board
        minePositions = generateMines(5, 5, parseInt(minesInput.value));
        gameActive = true;

        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleCellClick(cell));
            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(cell) {
        if (!gameActive || cell.classList.contains('clicked')) return;

        const index = parseInt(cell.dataset.index, 10);
        if (minePositions.includes(index)) {
            cell.classList.add('mine');
            alert('You hit a mine! You lose your bet.');
            resetGame();
        } else {
            cell.classList.add('clicked');
            currentBet += parseFloat(betAmountInput.value) * 0.1;
            alert(`Safe! Current bet amount: $${currentBet.toFixed(2)}`);
        }
    }

    function resetGame() {
        gameActive = false;
        currentBet = 0;
        gameBoard.innerHTML = ''; // Clear board
    }

    addMoneyButton.addEventListener('click', () => {
        totalMoney += 1000;
        updateTotalMoneyDisplay();
    });

    betButton.addEventListener('click', initializeGame);

    updateTotalMoneyDisplay(); // Initial update for display
});
