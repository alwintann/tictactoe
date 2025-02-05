function createPlayer(name, marker) {
    return {
        name, marker
    };
}
  
const player1 = createPlayer('steve', 'X');
const player2 = createPlayer('also steve', 'O');
const PLAYER1WIN = 1;
const PLAYER2WIN = 2;
const DRAW = 3;

//IIFE!!!
const gameBoard = (function() {
    let board = ["X","O","X",
                "O","O","X",
                "X","X","O"
    ];

    const update = (index, marker) => {
        if (board[index] == ""){
            board[index] = marker;
        }          
    } 

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWinner = () => {
        //check winner using patterns
        for (let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if (board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ){
                if (board[a] == "X"){;
                    return PLAYER1WIN;
                } else {;
                    return PLAYER2WIN;
                }
            }
        }
        if (board.every(cell => cell !== "")) {
            return DRAW;
        }

        return null;
    }

    return {
        getBoard: () => board,
        update,
        checkWinner
    };
})();

gameBoard.update(0,player1.marker);
gameBoard.update(0,player2.marker);

console.log(gameBoard.getBoard());
let winner = gameBoard.checkWinner();

if (winner == PLAYER1WIN) {
    console.log('congrats ' + player1.name);
} else if (winner == PLAYER2WIN) {
    console.log('congrats ' + player2.name);
} else if (winner == DRAW) {
    console.log('DRAW');
}
