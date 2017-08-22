
// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        this.sprite = 'images/enemy-bug.png';
        this.width = 
        this.x = -40;
        this.y = Math.floor(Math.random() * 201) + 50;
        this.speed = Math.floor(Math.random() * 101) + 65;
    }
    update(dt) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x = this.x + this.speed * dt;
            //the following resets the enemy's position to the left side
            //of the board and randomizes the speed as well as the x & y coordinates.
            if (this.x > 505) {
            this.x = -40;
            this.y = Math.floor(Math.random() * 201) + 50;
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
        this.x = 303 - this.width;
        this.y = 300;
    }
    handleInput(direction) {
        if (direction === 'right') {
            this.x += this.width;
        }
        if (direction === 'left') {
            this.x -= this.width;
        }
        if (direction === 'down') {
            this.y += this.width ;
        }
        if (direction === 'up') {
            this.y -= this.width;
        }
    }
    update(dt) {
            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            //this.x = this.x + this.speed * dt;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
