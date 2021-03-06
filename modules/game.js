class CreateGame {

    constructor(player1, player2ID, untakenSpace, playAgainstComputer) {
        this.player = player1;
        this.opponent = player2ID;
        this.board = [
            [untakenSpace, untakenSpace, untakenSpace],
            [untakenSpace, untakenSpace, untakenSpace],
            [untakenSpace, untakenSpace, untakenSpace]
        ];
        this.isOver = false;
        this.winner = null;
        this.playerTurn = true;
        this.untakenSpace = untakenSpace;
        this.playerSymbol = 'X';
        this.opponentSymbol = 'O';
        this.playAgainstComputer = playAgainstComputer;
        this.messages = [];
    }

    // Checks the id from Client-Side
    isValidCords(x, y) {
        if (!isNaN(x) && !isNaN(y) && (x >= 0 && x <= this.board.length - 1) && (y >= 0 && y <= this.board.length - 1)) {
            if (this.isSpaceUntaken(x, y))
                return true;
        }
        return false;
    }

    // Checks if the space is untaken
    isSpaceUntaken(x, y) {
        return (this.board[x][y] === this.untakenSpace)
    }

    // Stores play in board 
    storePlay(x, y, player) {
        if (player) {
            this.board[x][y] = this.playerSymbol;
        } else {
            this.board[x][y] = this.opponentSymbol;
        }

        this.nextTurn();
    }




    restartBoard() {

        // Clear board Array
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = [this.untakenSpace, this.untakenSpace, this.untakenSpace];
        }

        // Restart Game Variables
        this.isOver = false;
        this.winner = null;

        // Generate Random Turn
        this.playerTurn = (this.playerSymbol === 'X');

    }

    checkGameState() {

        const hasOpenSpaces = () => {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board.length; j++) {
                    if (this.board[i][j] == this.untakenSpace) {
                        return true;
                    }
                }
            }
            return false;
        }

        const equals3 = (a, b, c) => {
            return a == b && b == c && a != this.untakenSpace;
        }



        for (let i = 0; i < this.board.length; i++) { // Check for winner in ROWS
            if (equals3(this.board[i][0], this.board[i][1], this.board[i][2])) {
                // Winner found in ROW
                return this.board[i][0];
            }
        }

        for (let i = 0; i < this.board.length; i++) { // Check for winner in COLUMN
            if (equals3(this.board[0][i], this.board[1][i], this.board[2][i])) {
                // Winner found in COLUMN
                return this.board[0][i];
            }
        }

        if (equals3(this.board[0][0], this.board[1][1], this.board[2][2])) { // Check winner in diagonal left to right
            // Winner found in diagonal
            return this.board[0][0];
        }

        if (equals3(this.board[0][2], this.board[1][1], this.board[2][0])) { // Check winner in diagonal right to left
            // Winner found in diagonal
            return this.board[0][2];
        }

        if (!hasOpenSpaces()) { // Check for DRAW
            return 'draw';
        }

        return false;
    }

    nextTurn() {
        this.playerTurn = !this.playerTurn;

    }


    hasWinner() {
        const gameState = this.checkGameState();

        if (gameState !== false) {
            this.isOver = true;
            this.winner = gameState;
        }
    }

    playsFirst() {
        this.playerSymbol = 'X';
        this.opponentSymbol = 'O';
        this.playerTurn = true;
    }

    playsSecond() {
        this.playerSymbol = 'O';
        this.opponentSymbol = 'X';
        this.playerTurn = false;
    }

    storeMessage(message) {
        this.messages.push(message);
    }
}


module.exports = { CreateGame };