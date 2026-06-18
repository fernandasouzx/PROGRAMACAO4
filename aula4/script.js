const gameArea = document.querySelector(".game-area");
const scoreText = document.querySelector(".score-label strong");
const timerText = document.querySelector(".timer-label strong");
const startButton = document.querySelector(".start button");
const gameOverScreen = document.querySelector(".game-over");
const finalScore = document.querySelector(".final-score");
const restartButton = document.querySelector(".restart");

let score = 0;
let timeLeft = 20;
let gameInterval;
let timerInterval;
let playing = false;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
    if (playing) return;

    playing = true;
    score = 0;
    timeLeft = 15;

    scoreText.textContent = score;
    timerText.textContent = timeLeft + "s";

    startButton.style.display = "none";
    gameOverScreen.style.display = "none";

    // cria inimigos continuamente
    gameInterval = setInterval(createEnemy, 700);

    // contador do tempo
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft + "s";

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // duração total do jogo
    setTimeout(() => {
        if (playing) {
            endGame();
        }
    }, 15000);
}

function createEnemy() {

    const enemy = document.createElement("img");

    enemy.src = "mask_yami.png";
    enemy.classList.add("enemy");

    // posições aleatórias
    const maxX = gameArea.clientWidth - 80;
    const maxY = gameArea.clientHeight - 80;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    enemy.style.left = x + "px";
    enemy.style.top = y + "px";

    // clique no inimigo
    enemy.addEventListener("click", () => {

        score++;
        scoreText.textContent = score;

        // feedback visual
        enemy.style.transform = "scale(1.3)";
        enemy.style.opacity = "0";

        createBlood(x + 40, y + 40);

        setTimeout(() => {
            enemy.remove();
        }, 100);

    });

    gameArea.appendChild(enemy);

    // desaparece automaticamente
    setTimeout(() => {
        enemy.remove();
    }, 900);

}

function createBlood(x, y) {

    const blood = document.createElement("div");

    blood.classList.add("blood");
    blood.style.left = x + "px";
    blood.style.top = y + "px";

    gameArea.appendChild(blood);

    setTimeout(() => {
        blood.remove();
    }, 500);

}

function endGame() {

    playing = false;

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());

    finalScore.textContent = score;
    gameOverScreen.style.display = "flex";

    startButton.style.display = "block";
}

function restartGame() {
    gameOverScreen.style.display = "none";
    startGame();
}

// rastro do mouse
document.addEventListener("mousemove", (e) => {

    const trail = document.createElement("div");

    trail.classList.add("trail");
    trail.style.left = e.pageX + "px";
    trail.style.top = e.pageY + "px";

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 300);

});