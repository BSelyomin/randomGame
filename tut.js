const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 50;
let speed = 10;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

let enemyRadius;
let enemies = [];

//Game loop
function drawGame() {
  console.log("draw");
  clearScreen();
  requestAnimationFrame(drawGame);
  inputs();
  boundryCheck();
  drawGreenBlob();
}

function boundryCheck() {
  if (y < radius) {
    y = radius;
  }
  if (x < radius) {
    x = radius;
  }
  if (y > canvas.height - radius) {
    y = canvas.height - radius;
  }
  if (x > canvas.width - radius) {
    x = canvas.width - radius;
  }
}

function inputs() {
  if (downPressed) {
    y += speed;
  }
  if (upPressed) {
    y -= speed;
  }

  if (leftPressed) {
    x -= speed;
  }
  if (rightPressed) {
    x += speed;
  }
}
//requestAnimationFrame(func) can create a game loop
//setInterval(func, 1000) run func every 1 sec
// setInterval(drawGame, 1000 / 60); Same as request animeation frame

function drawGreenBlob() {
  ctx.fillStyle = "green";
  ctx.beginPath(); // starts circle
  ctx.arc(x, y, radius, 0, Math.PI * 2); // x,y , radius, start angle, end angle.
  ctx.fill();
}

function drawEnemy() {
  ctx.fillStyle = "white";
  let enemyX;
  let enemyY;
  let ran = getRandom(1, 4);
  if (ran == 1) {
    enemyX = 0;
    enemyY = getRandom(0, 600);
  } else {
    enemyX = getRandom(0, 800);
    enemyY = 0;
  }
  enemyRadius = getRandom(10, 50);
  let draw = function d() {
    ctx.beginPath(); // starts circle
    ctx.arc(enemyX, enemyY, enemyRadius, 0, Math.PI * 2); // x,y , radius, start angle, end angle.
    ctx.fill();
  };
  enemies.push(draw);

  for (i = 0; i == enemies.length; i++) {}
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(i) {
  if (i.keyCode == "40") {
    downPressed = true;
  }
  if (i.keyCode == "38") {
    upPressed = true;
  }
  if (i.keyCode == "37") {
    leftPressed = true;
  }
  if (i.keyCode == "39") {
    rightPressed = true;
  }
}

function keyUp(i) {
  if (i.keyCode == "40") {
    downPressed = false;
  }
  if (i.keyCode == "38") {
    upPressed = false;
  }
  if (i.keyCode == "37") {
    leftPressed = false;
  }
  if (i.keyCode == "39") {
    rightPressed = false;
  }
}

drawGame();

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(drawEnemy, 1000);
