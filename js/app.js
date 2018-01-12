"use strict";
// Enemies our player must avoid
function Enemy(rowNumber, speed) {
    this.rowNumber = rowNumber; // which of 3 rows enemy will appear on
    this.sprite = 'images/enemy-bug.png'; // enemy picture
    this.x = -10; // enemy starting x position
    if (rowNumber===1) { // enemy starting y position determined by row number
      this.y = 60;
    } else if (rowNumber===2) {
      this.y = 145;
    } else if (rowNumber===3) {
      this.y = 230;
    }

    if (speed === 'slow') { // enemy speed
      this.speed = 60;
    } else if (speed === 'medium') {
      this.speed = 100;
    } else if (speed === 'fast') {
      this.speed = 130;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed*dt); // new position depends on dt (time elapsed) and speed
    if (this.x>500) { // if new position takes enemy off screen reset their position so they come back onto screen
      this.x = -10;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
function Player() {
   this.sprite = 'images/char-boy.png'; // player image file
   this.x = 202; // player starting x and y positions
   this.y = 320;
 };

 Player.prototype.update = function(collision) {
   if (collision) { // if there's a collision (boolean value) reset player to start position
     this.x = 202;
     this.y = 320;
   }
 };

 Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Player.prototype.handleInput = function(key) {
   let topEdge = this.y <=10; // these logical statements are just checking to see if player is on an edge
   let rightEdge = this.x===404;
   let bottomEdge = this.y>=400;
   let leftEdge = this.x===0;
   if (key==='left' && !leftEdge) { // only update player locations on keypress if player not on an edge
       this.x = this.x - 101;
   } else if (key==='right' && !rightEdge) {
     this.x = this.x + 101;
   } else if (key==='up' && !topEdge) {
     this.y = this.y - 95;
   } else if (key === 'down' && !bottomEdge) { // down
     this.y = this.y + 95;
   }
 };


// Instantiate your objects.
// Place all enemy objects in an array called allEnemies - you can add enemies to this
// Place the player object in a variable called player
let allEnemies = [new Enemy(1, 'slow'), new Enemy(1, 'fast'), new Enemy(2, 'medium'), new Enemy(2, 'slow'), new Enemy(3, 'fast'), new Enemy(3, 'slow')]; // if you change these you will also have to change in reset() method
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
