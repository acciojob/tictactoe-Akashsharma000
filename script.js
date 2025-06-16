//your JS code here. If required.
(function(){
            const form = document.getElementById('player-form');
            const gameArea = document.getElementById('game-area');
            const messageDiv = document.getElementById('message');
            const cells = Array.from(document.querySelectorAll('.cell'));
            let players = { X: '', O: '' };
            let currentPlayer = 'X';
            let boardState = Array(9).fill(null);
            let gameOver = false;
            function updateMessage(text) {
                messageDiv.textContent = text;
            }

	 function switchPlayer() {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            function getPlayerName(playerSymbol) {
                return playerSymbol === 'X' ? players.X : players.O;
            }
	function checkWin() {
                const wins = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                ];

		 return wins.some(indices => {
                    const [a,b,c] = indices;
                    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
                });
            }
            function checkDraw() {
                return boardState.every(cell => cell !== null);
            }

	function disableAllCells() {
                cells.forEach(cell => cell.classList.add('disabled'));
            }
            function resetBoard() {
                boardState.fill(null);
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.disabled = false;
                    cell.classList.remove('disabled');
                    cell.setAttribute('aria-label', `Cell ${cell.id}`);
                });
                gameOver = false;
            }
	form.addEventListener('submit', (e) => {
                e.preventDefault();
                const player1Name = document.getElementById('player-1').value.trim();
                const player2Name = document.getElementById('player-2').value.trim();
                if (!player1Name || !player2Name) {
                    alert('Please enter names for both players.');
                    return;
                }
                if (player1Name === player2Name) {
                    alert('Player names must be different.');
                    return;
                }
		 players.X = player1Name;
                players.O = player2Name;
                form.hidden = true;
                gameArea.hidden = false;
                resetBoard();
                updateMessage(`${players.X}, you're up!`);
            });
	cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    if (gameOver) return;
                    const cellIndex = parseInt(cell.id, 10) - 1;
                    if (boardState[cellIndex] !== null) return;
                    boardState[cellIndex] = currentPlayer;
                    cell.textContent = currentPlayer;
                    cell.disabled = true;
                    cell.classList.add('disabled');
                    cell.setAttribute('aria-label', `Cell ${cell.id} marked with ${currentPlayer}`);
                    if (checkWin()) {
                        updateMessage(`${getPlayerName(currentPlayer)} congratulations you won!`);
                        gameOver = true;
                        disableAllCells();
                        return;
                    }
					if (checkDraw()) {
                        updateMessage(`It's a draw!`);
                        gameOver = true;
                        disableAllCells();
                        return;
                    }
                    switchPlayer();
                    updateMessage(`${getPlayerName(currentPlayer)}, you're up!`);
                });
            });
        })();