class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
    }

    makeMove(index) {
        if (this.board[index] || this.winner) return false;
        
        this.board[index] = this.currentPlayer;
        this.checkWinner();
        this.switchPlayer();
        return true;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]
            ) {
                this.winner = this.board[a];
                console.log("Winner")
                return true;
            }
        }

        if (this.board.every(cell => cell !== null)) {
            this.winner = 'Draw';
        }

        return false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
    }
}

// Example usage
const game = new TicTacToe();
game.makeMove(0); // Places 'X' at index 0
game.makeMove(4); // Places 'O' at index 4