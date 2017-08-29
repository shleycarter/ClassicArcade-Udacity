
// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        var enemyTracks = [61,142,223];
        this.sprite = 'images/enemy-bug.png';
        this.width = 
        this.x = -40;
        this.y = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
        this.speed = Math.floor(Math.random() * 101) + 65;
        console.log(this.y);
    }
    update(dt) {
        var enemyTracks = [61,142,223];    
        // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x = this.x + this.speed * dt;
            //the following resets the enemy's position to the left side
            //of the board and randomizes the speed as well as the x & y coordinates.
            if (this.x > 505) {
            this.x = -40;
            this.y = enemyTracks[Math.floor(Math.random() * enemyTracks.length)];
            this.speed = Math.floor(Math.random() * 101) + 50;
            console.log(this.y);
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.width = 101;
        this.height = 81;
        this.x = 303 - this.width;
        this.y = 404;
    }
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
        if(this.y < 0) {
            this.y = 0;
        }
        if(this.y > 404) {
            this.y = 404;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
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

console.log(player);
console.log(bug1);

function checkCollisions() {
    for (var i = 0; i < allEnemies.length ;i++){
    if (Player.x < allEnemies[i].x + 40 &&
      Player.x > allEnemies[i].x-40 &&
        Player.y < allEnemies[i].y + 40 &&
        Player.y > allEnemies[i].y-40){
        alert("You Lose!...Sad.");
            Player.resetPlayer();
        }
    }
}

checkCollisions();


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
