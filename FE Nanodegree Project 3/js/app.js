// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of the Enemy instances go here

    // The image/sprite for our enemies uses a helper provided 
    // elsewhere in the code to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    this.newLocation();
    this.newSpeed();
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if the Enemy has not yet crossed the screen, move it along
    if (this.x < 500) {
        this.x = this.x + (this.speed * dt);
    // otherwise, reset its location and give it a new speed.
    } else {
        this.x = -100;
        this.newLocation();
        this.newSpeed();
    };

    // if the Enemy collide with the Player's position, update the score
    // and prepare to reset the Player's position
    if ((this.y == player.y) && (player.x  > this.x) && (player.x < this.x + 20)) {
        collision = true;
        player.currentScore = player .currentScore - 10;
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Give the enemy a new location
Enemy.prototype.newLocation = function() {
    var yLocations = [65, 145, 225];
    this.y = yLocations[Math.floor(Math.random() * yLocations.length)];
};

// Give the enemy a new speed
Enemy.prototype.newSpeed = function() {
    var max_speed = 500;
    var min_speed = 200;
    this.speed = Math.random() * (max_speed - min_speed) + min_speed;
};


// The Player the user controls is created
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.reset();

    // Create the initial score of 0 points
    this.currentScore = 0;
    this.score = "Score: " + String(this.currentScore);
};

// Check to see if a collision has been detected and adjust 
// the game accordingly if so.
Player.prototype.update = function(dt) {

    if (collision == true) {
        this.render();
        this.reset();
        collision = false;
    };
}

// Draw the Player and the score on the canvas
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

// Move the Player in the game according to the user's input
Player.prototype.handleInput = function(key) {
    // Move left
    if (key == "left" && this.x > 0) {
        this.x = this.x - 100;
    // More right
    } else if (key == "right" && this.x < 400) {
        this.x = this.x + 100;
    // Move up
    } else if (key == "up") {
        if (this.y > 100) {
            this.y = this.y - 80; 
        // If the Player reached the top of the map, award points
        } else {
            this.currentScore = this.currentScore + 20;
            this.render();
            this.reset();
        }
    // Move down
    } if (key == "down" && this.y < 375) {
        this.y = this.y + 80;
    }
};

// Reset the Player's position to the start of the game
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 385;
};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
var enemy0 = new Enemy();
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy0, enemy1, enemy2];

// Place the player object in a variable called player
var player = new Player();

// Initialise the collision variable
var collision = false;

// This listens for key presses and sends the keys to the
// Player.handleInput() method. Y
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
