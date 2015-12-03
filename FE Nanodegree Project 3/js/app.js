// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    this.newLocation();
    this.newSpeed();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100;
        this.newLocation();
        this.newSpeed();
    };

    if ((this.y == player.y) && (player.x  > this.x) && (player.x < this.x + 20)) {
        collision = true;
        player.currentScore = player .currentScore - 10;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.newLocation = function() {
    var yLocations = [65, 145, 225];
    this.y = yLocations[Math.floor(Math.random() * yLocations.length)];
};

Enemy.prototype.newSpeed = function() {
    var max_speed = 500;
    var min_speed = 200;
    this.speed = Math.random() * (max_speed - min_speed + 1) + min_speed;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.reset();

    this.currentScore = 0;
    this.score = "Score: " + String(this.currentScore);
    //this.drawScore();
};

Player.prototype.update = function(dt) {

    if (collision == true) {
        this.render();
        this.reset();
        collision = false;
    };

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    this.score = "Score: " + String(this.currentScore);

    ctx.font = "20pt Impact";
    ctx.textAlign = "center";

    ctx.fillStyle = "white";
    ctx.fillText(this.score, 430, 580);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(this.score, 430, 580);
}

Player.prototype.handleInput = function(key) {
    if (key == "left" && this.x > 0) {
        this.x = this.x - 100;
    } else if (key == "right" && this.x < 400) {
        this.x = this.x + 100;

    } else if (key == "up") {
        if (this.y > 100) {
            this.y = this.y - 80; 
        } else {
            this.currentScore = this.currentScore + 20;
            this.render();
            this.reset();
        }
    } if (key == "down" && this.y < 375) {
        this.y = this.y + 80;
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy0 = new Enemy();
var enemy1 = new Enemy();
var enemy2 = new Enemy();

var allEnemies = [enemy0, enemy1, enemy2];
var player = new Player();

var collision = false;






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
