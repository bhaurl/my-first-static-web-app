const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score-count');
const startButton = document.getElementById('start-button');

let score = 0;
let gameInterval;
let fallingInterval;
let basketLeft = 200; // Start position of the basket
let basketSpeed = 10; // Speed of the basket

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startButton.style.display = 'none';
    basket.style.left = basketLeft + 'px';

    document.addEventListener('keydown', moveBasket);

    gameInterval = setInterval(updateGame, 20);
    fallingInterval = setInterval(createFallingItem, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(fallingInterval);
    const items = document.querySelectorAll('.falling-item');
    items.forEach(item => item.remove());
    startButton.style.display = 'inline-block';
    document.removeEventListener('keydown', moveBasket);
    alert(`Game over! Your score is ${score}.`);
}

function moveBasket(event) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basketLeft -= basketSpeed;
        basket.style.left = basketLeft + 'px';
    } else if (event.key === 'ArrowRight' && basketLeft < gameAreaRect.width - basket.clientWidth) {
        basketLeft += basketSpeed;
        basket.style.left = basketLeft + 'px';
    }
}

function createFallingItem() {
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 30)) + 'px';
    item.style.top = '0px';
    gameArea.appendChild(item);

    function moveItem() {
        const itemTop = parseInt(item.style.top, 10);
        if (itemTop >= gameArea.clientHeight - basket.clientHeight - 30 && isCaught(item)) {
            clearInterval(itemInterval);
            item.remove();
            score++;
            scoreDisplay.textContent = score;
        } else if (itemTop >= gameArea.clientHeight - 30) {
            clearInterval(itemInterval);
            item.remove();
            endGame();
        } else {
            item.style.top = itemTop + 5 + 'px';
        }
    }

    const itemInterval = setInterval(moveItem, 20);
}

function isCaught(item) {
    const itemRect = item.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    return !(itemRect.bottom < basketRect.top || 
             itemRect.top > basketRect.bottom || 
             itemRect.right < basketRect.left || 
             itemRect.left > basketRect.right);
}

startButton.addEventListener('click', startGame);

function updateGame() {
    // This function can be used to update other game elements if needed
}
