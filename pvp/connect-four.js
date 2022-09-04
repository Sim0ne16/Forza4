/**
 * Minimax (+Alpha-Beta) Implementation 
 * @plain javascript version
 */
function Game() {
    this.rows = 6; // Height
    this.columns = 7; // Width
    this.status = 0; // 0: running, 1: won, 2: lost, 3: tie
    this.depth = 4; // Search depth
    this.score = 100000, // Win/loss score
    this.round = 0; // 0: Human, 1: Computer
    this.winning_array = []; // Winning (chips) array
    this.iterations = 0; // Iteration count
    
    that = this;

    that.init();
}

Game.prototype.init = function() {
    // Generate 'real' board
    // Create 2-dimensional array
    var game_board = new Array(that.rows);
    for (var i = 0; i < game_board.length; i++) {
        game_board[i] = new Array(that.columns);

        for (var j = 0; j < game_board[i].length; j++) {
            game_board[i][j] = null;
        }
    }

    // Create from board object (see board.js)
    this.board = new Board(this, game_board, 0);

    // Generate visual board
    var game_board = "";
    for (var i = 0; i < that.rows; i++) {
        game_board += "<tr>";
        for (var j = 0; j < that.columns; j++) {
            game_board += "<td class='empty'></td>";
        }
        game_board += "</tr>";
    }

    document.getElementById('game_board').innerHTML = game_board;

    // Action listeners
    var td = document.getElementById('game_board').getElementsByTagName("td");

    for (var i = 0; i < td.length; i++) {
        if (td[i].addEventListener) {
            td[i].addEventListener('click', that.act, false);
        } else if (td[i].attachEvent) {
            td[i].attachEvent('click', that.act)
        }
    }
}

/**
 * On-click event
 */
Game.prototype.act = function(e) {
    var element = e.target || window.event.srcElement;

    // Human1 round
    if (that.round == 0) that.place(element.cellIndex);
    
    // Human2 round
    if (that.round == 1) that.place(element.cellIndex);
}

Game.prototype.place = function(column) {
    // If not finished
    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        for (var y = that.rows - 1; y >= 0; y--) {
            if (document.getElementById('game_board').rows[y].cells[column].className == 'empty') {
                if (that.round == 1) {
                    document.getElementById('game_board').rows[y].cells[column].className = 'coin cpu-coin';
                } else {
                    document.getElementById('game_board').rows[y].cells[column].className = 'coin human-coin';
                }
                break;
            }
        }

        if (!that.board.place(column)) {
            return alert("Invalid move!");
        }

        that.round = that.switchRound(that.round);
        that.updateStatus();
    }
}




Game.prototype.switchRound = function(round) {
    // 0 Human, 1 Computer
    if (round == 0) {
        return 1;
    } else {
        return 0;
    }
}

Game.prototype.updateStatus = function() {
    // Human won
    if (that.board.score() == -that.score) {
        that.status = 1;
        that.markWin();
        let name1 = localStorage.getItem('player1')
        alert(name1 +" win!");
        var scoreTrack = parseInt(document.getElementById("player1-points").innerHTML);
        scoreTrack += 1;
        document.getElementById("player1-points").innerHTML = scoreTrack;
    }

    // Computer won
    if (that.board.score() == that.score) {
        that.status = 2;
        that.markWin();
        let name2 = localStorage.getItem('player2')
        alert( name2 + " win!");
        var scoreTrack = parseInt(document.getElementById("player2-points").innerHTML);
        scoreTrack += 1;
        document.getElementById("player2-points").innerHTML = scoreTrack;
    }

    // Tie
    if (that.board.isFull()) {
        that.status = 3;
        alert("Tie!");
    }

    var html = document.getElementById('status');
    if (that.status == 0) {
        html.className = "status-running";
        html.innerHTML = "running";
    } else if (that.status == 1) {
        html.className = "status-won";
        html.innerHTML = "won";
    } else if (that.status == 2) {
        html.className = "status-lost";
        html.innerHTML = "lost";
    } else {
        html.className = "status-tie";
        html.innerHTML = "tie";
    }
}

Game.prototype.markWin = function() {
    document.getElementById('game_board').className = "finished";
    for (var i = 0; i < that.winning_array.length; i++) {
        var name = document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className;
        document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className = name + " win";
    }
}

Game.prototype.restartGame = function() {
    if (confirm('Game is going to be restarted.\nAre you sure?')) {
        // Dropdown value
        that.init();
        document.getElementById('game_board').className = "";
        that.updateStatus();
    }
}

/**
 * Start game
 */
function initPvp() {
    document.getElementById("player1-name").innerHTML = localStorage.getItem('player1') + " score:";
    document.getElementById("player2-name").innerHTML = localStorage.getItem('player2') + " score:";
    window.Game = new Game();
}

window.onload = function() {
    initPvp()
};
