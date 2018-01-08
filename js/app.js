// Enemies our player must avoid
function Enemy(rowNumber, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.rowNumber = rowNumber;
    this.sprite = 'images/enemy-bug.png';
    this.x = -10;
    if (rowNumber===1) {
      this.y = 60;
    } else if (rowNumber===2) {
      this.y = 145;
    } else if (rowNumber===3) {
      this.y = 230;
    }

    if (speed === 'slow') {
      this.speed = 60;
    } else if (speed === 'medium') {
      this.speed = 100;
    } else if (speed === 'fast') {
      this.speed = 130;
    }
      // canvas.width = 505;
      // canvas.height = 606;
      // numRows = 6,
      // numCols = 5,
      // width of each block = 505/5 = 101
      // height of each block = 606/6 = 101
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // so you have some time elapsed dt
    // you have initial x position - this.x
    // you have the enemy's speed in px/ms
    // new x position will be current position + speed*dt
    this.x = this.x + (this.speed*dt);
    if (this.x>500) {
      this.x = -10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
   this.sprite = 'images/char-boy.png';
   this.x = 202;
   this.y = 320;
 };

 Player.prototype.update = function(collision) {
   if (collision) {
     this.x = 202;
     this.y = 320;
   }
 };

 Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Player.prototype.handleInput = function(key) {
   let topEdge = this.y <=10;
   let rightEdge = this.x===404;
   let bottomEdge = this.y>=400;
   let leftEdge = this.x===0;
   if (key==='left' && !leftEdge) {
       this.x = this.x - 101;
   } else if (key==='right' && !rightEdge) {
     this.x = this.x + 101;
   } else if (key==='up' && !topEdge) {
     this.y = this.y - 95;
   } else if (key === 'down' && !bottomEdge) { // down
     this.y = this.y + 95;
   }
 };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(1, 'slow'), new Enemy(2, 'medium'), new Enemy(3, 'fast')];
let player = new Player();

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
