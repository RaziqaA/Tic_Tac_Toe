const cells = document.querySelectorAll('[data-cell]');
const result = document.getElementById('result');
const message = document.getElementById('message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameOver = true;
      message.textContent = `${currentPlayer} wins!`;
      result.style.display = 'flex';
      return;
    }
  }

  if ([...cells].every((cell) => cell.textContent !== '')) {
    gameOver = true;
    message.textContent = 'It\'s a draw!';
    result.style.display = 'flex';
  }
}

function handleCellClick(e) {
  const cell = e.target;
  if (gameOver || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.style.background = currentPlayer === 'X' ? '#ff8080' : '#8c30f0';

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function startNewGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.background = '#eee';
  });
  result.style.display = 'none';
  currentPlayer = 'X';
  gameOver = false;
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

newGameButton.addEventListener('click', startNewGame);
