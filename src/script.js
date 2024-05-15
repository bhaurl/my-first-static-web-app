let score = 0;
let timeLeft = 10;
let timerInterval;

const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score-count');
const clickButton = document.getElementById('click-button');
const startButton = document.getElementById('start-button');

clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
});

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    clickButton.style.display = 'inline-block';
    startButton.style.display = 'none';

    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clickButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    alert(`Game over! Your score is ${score}.`);
}
