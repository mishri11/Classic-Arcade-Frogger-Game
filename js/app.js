"use strict";

let player, allEnemies; // these variables get defined when gameReset() is called in engine.js

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

 Player.prototype.checkCollisions = function(allEnemies) {
   let self = this; // save this for use in forEach() callback function
   allEnemies.forEach(function(enemy) {
     // if player and an enemy are in the same row and within a certain x distance apart, there is a collision and so reset the player to start position
     let sameRow = (enemy.rowNumber===1 & self.y===35) || (enemy.rowNumber===2 & self.y===130) || (enemy.rowNumber===3 & self.y===225);
     if (sameRow && Math.abs(enemy.x-self.x)<50) {
       self.reset();
     }
   });
 }

 Player.prototype.reset = function() { // resets the player to starting position
     this.x = 202;
     this.y = 320;
 };

 Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Player.prototype.handleInput = function(key) {
  // only update player locations on keypress if player not on an edge
   if (key==='left' && !(this.x===0)) { // if player is not on left edge, move left by subtracting from x
       this.x = this.x - 101;
   } else if (key==='right' && !(this.x===404)) { // if player is not on right edge, move right
     this.x = this.x + 101;
   } else if (key==='up' && !(this.y <=10)) { // if player is not on top edge, move up
     this.y = this.y - 95;
   } else if (key === 'down' && !(this.y>=400)) { // if player is not on bottom edge, move down
     this.y = this.y + 95;
   }
 };

 Player.prototype.checkWin = function() {
   if (this.y<35) {
     return true;
   } else {
     return false;
   }
 };

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
