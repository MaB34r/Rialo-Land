const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const jumpBtn = document.getElementById("jumpBtn");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameOver = false;

// Lompat
function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;

  let up = 0;
  const jumpInterval = setInterval(() => {
    if (up >= 80) {
      clearInterval(jumpInterval);
      const fallInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(fallInterval);
          isJumping = false;
        }
        up -= 5;
        player.style.bottom = up + "px";
      }, 25);
    }
    up += 5;
    player.style.bottom = up + "px";
  }, 25);
}

// Deteksi tabrakan
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.right > obstacleRect.left + 10 &&
    playerRect.left < obstacleRect.right - 10 &&
    playerRect.bottom > obstacleRect.top + 10
  ) {
    return true;
  }
  return false;
}

// Loop utama
function loop() {
  if (!gameOver) {
    if (checkCollision()) {
      gameOver = true;
      alert("Game Over! Your score: " + Math.floor(score / 50));
      location.reload();
    }

    score++;
    scoreDisplay.textContent = "Score: " + Math.floor(score / 50);
  }
  requestAnimationFrame(loop);
}

// Kontrol
jumpBtn.addEventListener("click", jump);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

loop();