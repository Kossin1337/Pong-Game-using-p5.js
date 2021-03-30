/* VARIABLES */
let ballPositionX, ballPositionY, ballSize;
let ballSpeedX, ballSpeedY;
let playerRectWitdh, playerRectHeight;
let playerLeftPositionX, playerRightPositionX;
let playerLeftPositionY, playerRightPositionY;
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let playerMoveSpeed;
let gameStarted = false;
let roundStarted = false;

function setup() {
  createCanvas(800, 500);
  background(0, 200);
  frameRate(60);
  ballPositionX = width/2;
  ballPositionY = height/2;
  ballSize = 20;
  ballSpeedX = 6;
  ballSpeedY = 3;
  playerRectWitdh = 10;
  playerRectHeight = height/8;
  playerLeftPositionX = 50;
  playerLeftPositionY = height/2;
  playerRightPositionX = width - 50;
  playerRightPositionY = height/2;
  playerMoveSpeed = 7.5;

  randomStartingDirection();
  gameStarted = true;
  roundStarted = true;
}

function draw() {
  background(0, 200);
  /* drawing a ball on canvas - DONE */
  push();
  fill(255);
  stroke(255);
  circle(ballPositionX, ballPositionY, ballSize);
  pop();

  /* random ball starting direction, ball movement and logic - DONE */
  if(roundStarted === false) {
    randomStartingDirection();
    roundStarted = true;
  }

  ballPositionX += ballSpeedX;
  ballPositionY += ballSpeedY;

  if(ballPositionX < 0) {
    rightPlayerScore++;
    newRound();
  }
  if(ballPositionX > width) {
    leftPlayerScore++;
    newRound();
  }
  if(ballPositionY < ballSize / 2 || ballPositionY > height - ballSize / 2) {
    ballSpeedY *= -1;
  }

  /* generating 2 players - DONE */
  push();
  rectMode(CENTER);
  rect(playerLeftPositionX, playerLeftPositionY, playerRectWitdh, playerRectHeight);
  rect(playerRightPositionX, playerRightPositionY, playerRectWitdh, playerRectHeight);


  /* player movement (left: W - up, S - down | right: ArrowUP - up, ArrowDOWN - down ) - DONE*/
  if((keyIsDown(87)) && playerLeftPositionY > playerRectHeight/2) {
    playerLeftPositionY -= playerMoveSpeed;
  }
  if((keyIsDown(83)) && playerLeftPositionY < height - playerRectHeight/2) {
    playerLeftPositionY += playerMoveSpeed;
  }
  if((keyIsDown(UP_ARROW) || (keyIsDown(104))) && playerRightPositionY > playerRectHeight/2) {
    playerRightPositionY -= playerMoveSpeed;
  }
  if((keyIsDown(DOWN_ARROW) || (keyIsDown(98))) && playerRightPositionY < height - playerRectHeight/2) {
    playerRightPositionY += playerMoveSpeed;
  }

  /* player and ball collision maybe use dist - DONE BUT COULD BE BETTER*/
  // mainly we need to check collision on X axis: ballPositionX - playerLeftPositionX < ballSize/2 + playerRectWitdh/2
  // y axis: && (ballPositionY - playerLeftPositionY < playerRectHeight/2) || ( ballPositionY - playerLeftPositionY < playerRectHeight/2)
  if((playerLeftPositionX < ballPositionX) && (ballPositionX - playerLeftPositionX < ballSize/2 + playerRectWitdh/2)) {
    if(playerLeftPositionY > ballPositionY) {
      if(playerLeftPositionY - ballPositionY <= playerRectHeight/2 + 2) {
        ballHit();
      }
    } else {
      if(ballPositionY - playerLeftPositionY <= playerRectHeight/2 + 2) {
        ballHit();
      }
    }
  }
  if((playerRightPositionX > ballPositionX) && (playerRightPositionX - ballPositionX < ballSize/2 + playerRectWitdh/2)) {
    if(playerRightPositionY > ballPositionY) {
      if(playerRightPositionY - ballPositionY <= playerRectHeight/2 + 2) {
        ballHit();
      }
    } else {
      if(ballPositionY - playerRightPositionY <= playerRectHeight/2 + 2) {
        ballHit();
      }
    }
  }
  pop();

  /* display players score - DONE */
  push();
  textSize(48);
  fill(150, 0, 0, 200)
  text(leftPlayerScore, width/4, 75);
  text(rightPlayerScore, width/4 * 3, 75);
  pop();

  /* drawing borders and splitting line - DONE */
  push();
  stroke('rgba(255, 255, 255, 0.05)');
  strokeWeight(1);
  line(width/2, 0, width/2, height);
  strokeWeight(5);
  stroke(255);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, width, height);
  pop();
}

function randomStartingDirection() {
  return random() > 0.5 ? ballSpeedX *= -1 : ballSpeedY *= -1;
}

function newRound() {
  roundStarted = false;
  ballPositionX = width / 2;
  ballPositionY = height / 2;
  ballSpeedX = 6;
}

function ballHit() {
  ballSpeedX *= 1.025;
  ballSpeedX *= -1;
}