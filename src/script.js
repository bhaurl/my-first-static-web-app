const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score-count');
const startButton = document.getElementById('start-button');

let score = 0;
let gameInterval;
let fallingInterval;

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startButton.style.display = 'none';
    basket.style.left = '200px';

    gameInterval = setInterval(moveBasket, 10);
    fallingInterval = setInterval(createFallingItem, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(fallingInterval);
    const items = document.querySelectorAll('.falling-item');
    items.forEach(item => item.remove());
    startButton.style.display = 'inline-block';
    alert(`Game over! Your score is ${score}.`);
}

function moveBasket() {
    document.addEventListener('keydown', (event) => {
        const left = parseInt(basket.style.left, 10);
        if (event.key === 'ArrowLeft' && left > 0) {
            basket.style.left = left - 5 + 'px';
        } else if (event.key === 'ArrowRight' && left < 400) {
            basket.style.left = left + 5 + 'px';
        }
    });
}

function createFallingItem() {
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.style.left = Math.floor(Math.random() * 470) + 'px';
    gameArea.appendChild(item);

    let itemInterval = setInterval(() => {
        let itemTop = parseInt(window.getComputedStyle(item).getPropertyValue('top'));
        if (itemTop >= 470) {
            clearInterval(itemInterval);
            item.remove();
            endGame();
        } else {
            item.style.top = itemTop + 5 + 'px';

            if (isCaught(item)) {
                clearInterval(itemInterval);
                item.remove();
                score++;
                scoreDisplay.textContent = score;
            }
        }
    }, 20);
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
