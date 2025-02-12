class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const PLAYER1WIN = 1;
const PLAYER2WIN = 2;
const DRAW = 3;
let gameEnded = false;

class GameBoard {
    constructor() {
        this.board = Array(9).fill("");
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
    }

    update(index, marker) {
        if (this.board[index] === "") {
            this.board[index] = marker;
            return true;
        }
        const currentPlayer = game.getCurrentPlayer();
        console.log(currentPlayer.name + " made an illegal move!")
        return false;
    }

    checkWinner() {
        // Check for winning patterns
        for (let pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            if (
                this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]
            ) {
                if (this.board[a] == "X"){;
                    gameEnded = true;
                    return PLAYER1WIN;
                } else {
                    gameEnded = true;
                    return PLAYER2WIN;
                }
            }
        }

        // Check for draw
        if (this.board.every(cell => cell !== "")) {
            gameEnded = true;
            return 'Draw';
        }

        return 'Move';
    }

    reset() {
        console.log("BOARD RESET")
        this.board = Array(9).fill("");
    }

    getBoard() {
        return [...this.board]; // Return a copy of the board
    }
}

class TicTacToe {
    constructor(player1Name, player2Name) {
        this.gameBoard = new GameBoard();
        this.players = [
            new Player(player1Name, 'X'),
            new Player(player2Name, 'O')
        ];
        this.currentPlayerIndex = 0;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    makeMove(index) {
        const currentPlayer = this.getCurrentPlayer();
        
        if (this.gameBoard.update(index, currentPlayer.marker)) {
            // Check for winner after move
            const result = this.gameBoard.checkWinner();
            
            // Switch players
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            
            if (result == "Move") {
                console.log(currentPlayer.name + " moved");
            }

            return result;
        }
        
        return false;
    }

    reset() {
        console.log("GAME RESET!")
        this.gameBoard.reset();
        this.currentPlayerIndex = 0;
    }
}

// Example usage:


const cells = document.querySelectorAll('.cell')
const modal = document.getElementById('winnerModal');
const closeModal = document.getElementById('closeModal');
const gameScreen = document.getElementById('gameScreen');
const startGameBtn = document.getElementById('startGame');
const playerSelect = document.getElementById('playerSelect');


let game;

startGameBtn.addEventListener('click', () => {
    const player1 = player1Input.value.trim() || "Player 1";
    const player2 = player2Input.value.trim() || "Player 2";
    console.log(player1 + player2);
    game = new TicTacToe(player1, player2);

    playerSelect.style.display = "none";
    gameScreen.style.display = "block";
})



cells.forEach(cell => {
    cell.addEventListener('click', () => {

        const index = cell.getAttribute('data-index');
        const moveResult = game.makeMove(index);
        if (moveResult !== false) {
            const currentMarker = game.gameBoard.getBoard()[index];
            //console.log('currentmarker' + currentMarker)
            cell.textContent = currentMarker;
            cell.classList.add(currentMarker.toLowerCase());

        }

        //prevent moves if game is ended
        function showWinnerModal(message) {
            winnerText.textContent = message;
            modal.style.display = 'flex';
        }
    

        if (gameEnded) {
            const player1 = player1Input.value.trim() || "Player 1";
            const player2 = player2Input.value.trim() || "Player 2";
            let winner = game.gameBoard.checkWinner();
            if (winner == PLAYER1WIN) {
                showWinnerModal(player1 + ' wins!');
                //console.log('congrats ' + player1);
            } else if (winner == PLAYER2WIN) {
                showWinnerModal(player2 + ' wins!');
                //console.log('congrats ' + player2);
            } else if (winner == DRAW) {
                showWinnerModal('Its a draw');
                //console.log('DRAW');
            }
            return;
        }

        //console.log('move result' + moveResult)
        //console.log(game.getCurrentPlayer()); // Shows current player
        //console.log(game.gameBoard.getBoard()); // View current board state

    });



})
resetButton.addEventListener('click', () => {
    gameEnded = false;
    //console.log("event triggered");
    const startingPlayer = game.reset();
    //clear cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    })
    // Show player select screen
    gameScreen.style.display = 'none';
    playerSelect.style.display = 'block';
    // Clear input fields
    player1Input.value = '';
    player2Input.value = '';
});

function hideModal() {
    modal.style.display = 'none';
    gameEnded = false;
    //console.log("event triggered");
    const startingPlayer = game.reset();
    //clear cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    })
}
closeModal.addEventListener('click', hideModal);



// Make some moves
//console.log(game.makeMove(0)); // First player (X) plays


