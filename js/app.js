
// Enemies our player must avoid
class Enemy {
    constructor() {
        // Keeping the enemies on 1 of the 3 rows on the canvas
        var enemyTracks = [61,142,223];
        this.sprite = 'images/enemy-bug.png';
        this.width = 40;
        this.height = 40;
        this.x = -40;
        this.y = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
        this.speed = Math.floor(Math.random() * 101) + 65;
    }
    update(dt) {
        var enemyTracks = [61,142,223];    
            // Multiplying any movement by the dt parameter
            // will ensure the game runs at the same speed for
            // all computers.
            this.x = this.x + this.speed * dt;
            //the following resets the enemy's position to the left side
            //of the board and randomizes the speed as well as the x & y coordinates.
            if (this.x > 505) {
            this.x = -40;
            this.y = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
            this.speed = Math.floor(Math.random() * 101) + 50;
        }
    }
    render() {
        // Rendering the enemy on the canvas
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// This is the player class, that has to move to avoid the enemies
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.width = 101;
        this.height = 81;
        this.x = 303 - this.width;
        this.y = 404;
    }
    // Referencing the event listener below, waiting for user input on player moves
    handleInput(direction) {
        if (direction === 'right') {
            this.x += this.width;
        }
        if (direction === 'left') {
            this.x -= this.width;
        }
        if (direction === 'down') {
            this.y += this.height ;
        }
        if (direction === 'up') {
            this.y -= this.height;
        }
    }
    update(dt) {
        // Making sure the player stays on the canvas game board
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.x > 404) {
            this.x = 404;
        }
        // If the player makes it to the top of the game board, they have won
        if(this.y < 0) {
            alert("You Win!...The people are grateful for the information. You fact checked right?");
            this.resetPlayer(); 
        }
        if(this.y > 404) {
            this.y = 404;
        }
    }
    render() {
        // Rendering the player on the canvas
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // Collision Detection between the player and the enemy
        for (var i = 0; i < allEnemies.length ;i++){
            if (this.x < allEnemies[i].x + allEnemies[i].width &&
                this.x > allEnemies[i].x - allEnemies[i].width &&
                this.y < allEnemies[i].y + allEnemies[i].height &&
                this.y > allEnemies[i].y - allEnemies[i].height){
                    setTimeout(alert("You Lose!...Sad."), 200);
                    setTimeout(this.resetPlayer(), 500);
                }
            }
    }
    // When the player hits an enemy this resets the player to the start position
    resetPlayer() {
        this.x = 303 - this.width;
        this.y = 404;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1, bug2, bug3];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});