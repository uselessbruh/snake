const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- CONFIGURATION ---
const INTERNAL_SIZE = 600;
const TILE_SIZE = 25;
const TILE_COUNT = INTERNAL_SIZE / TILE_SIZE;
const INITIAL_SPEED = 180;

// Game State
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = INITIAL_SPEED;
let gameLoop;
let isGameRunning = false;

// Entities
let snake = [];
let food = { x: 0, y: 0 };
let velocity = { x: 0, y: 0 };
let nextVelocity = { x: 0, y: 0 };

// DOM Elements
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const finalScoreEl = document.getElementById('finalScore');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

highScoreEl.innerText = highScore;

// --- INPUT HANDLING (Keyboard) ---
document.addEventListener('keydown', (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    handleInput(e.key);
});

// --- INPUT HANDLING (On-Screen Buttons) ---
// Note: We use touchstart to prevent delay on mobile
const setupBtn = (id, key) => {
    const btn = document.getElementById(id);
    const action = (e) => {
        e.preventDefault(); // Stop vibration/zoom
        handleInput(key);
    };
    btn.addEventListener('touchstart', action, { passive: false });
    btn.addEventListener('mousedown', action); // For desktop testing
};

setupBtn('btnUp', 'ArrowUp');
setupBtn('btnDown', 'ArrowDown');
setupBtn('btnLeft', 'ArrowLeft');
setupBtn('btnRight', 'ArrowRight');

// FIX LAYOUT FOR D-PAD LOGIC
// I realized the HTML structure above needs to be slightly tweaked for a true D-Pad layout
// Let's re-arrange the D-Pad in JS or just use the structure provided.
// The structure above is: UP, then a row with LEFT, DOWN, RIGHT. 
// A better layout is usually Up, then Middle Row (Left, Right), then Bottom (Down).
// I will fix the HTML structure below via innerHTML injection for cleaner layout if the previous was confusing.
// Actually, let's just swap the HTML structure in the body to be correct standard D-Pad.
// (See the updated HTML body structure: Up is separate, Middle is Left/Right, Down is separate).

function handleInput(key) {
    if (!isGameRunning) return;

    switch (key) {
        case 'ArrowLeft': case 'a': case 'A':
            if (velocity.x !== 1) nextVelocity = { x: -1, y: 0 }; break;
        case 'ArrowUp': case 'w': case 'W':
            if (velocity.y !== 1) nextVelocity = { x: 0, y: -1 }; break;
        case 'ArrowRight': case 'd': case 'D':
            if (velocity.x !== -1) nextVelocity = { x: 1, y: 0 }; break;
        case 'ArrowDown': case 's': case 'S':
            if (velocity.y !== -1) nextVelocity = { x: 0, y: 1 }; break;
    }
}

// --- SWIPE HANDLING (Backup) ---
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

canvas.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

canvas.addEventListener('touchend', function (e) {
    if (!isGameRunning) return;
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
}, { passive: false });

function handleSwipe(startX, startY, endX, endY) {
    let diffX = endX - startX;
    let diffY = endY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) handleInput('ArrowRight');
        else handleInput('ArrowLeft');
    } else {
        if (diffY > 0) handleInput('ArrowDown');
        else handleInput('ArrowUp');
    }
}

// --- GAME LOGIC ---

function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    score = 0;
    scoreEl.innerText = score;
    gameSpeed = INITIAL_SPEED;
    const mid = Math.floor(TILE_COUNT / 2);
    snake = [{ x: mid, y: mid }, { x: mid, y: mid + 1 }, { x: mid, y: mid + 2 }];
    velocity = { x: 0, y: -1 };
    nextVelocity = { x: 0, y: -1 };
    placeFood();
    isGameRunning = true;
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, gameSpeed);
}

function update() {
    velocity = { ...nextVelocity };
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver(); return;
    }
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            gameOver(); return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.innerText = score;
        placeFood();
        increaseDifficulty();
    } else {
        snake.pop();
    }
    draw();
}

function draw() {
    // Background
    for (let i = 0; i < TILE_COUNT; i++) {
        for (let j = 0; j < TILE_COUNT; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? '#1a1a1a' : '#222';
            ctx.fillRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    drawApple(food.x, food.y);
    drawSnake();
}

function drawApple(x, y) {
    const centerX = x * TILE_SIZE + TILE_SIZE / 2;
    const centerY = y * TILE_SIZE + TILE_SIZE / 2;
    const radius = TILE_SIZE / 2 - 2;
    ctx.fillStyle = '#ff4444';
    ctx.shadowColor = '#ff4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY + 1, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff8888';
    ctx.beginPath();
    ctx.arc(centerX - 3, centerY - 3, radius / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(centerX - 1, centerY - radius - 2, 2, 6);
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.ellipse(centerX + 4, centerY - radius, 6, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawSnake() {
    snake.forEach((part, index) => {
        const centerX = part.x * TILE_SIZE + TILE_SIZE / 2;
        const centerY = part.y * TILE_SIZE + TILE_SIZE / 2;
        let radius = TILE_SIZE / 2;

        if (index === 0) {
            drawHead(centerX, centerY);
        } else if (index === snake.length - 1) {
            ctx.fillStyle = '#388E3C';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - 4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = index % 2 === 0 ? '#4CAF50' : '#43A047';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 1, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function drawHead(x, y) {
    ctx.save();
    ctx.translate(x, y);
    let rotation = 0;
    if (velocity.x === 1) rotation = 0;
    if (velocity.x === -1) rotation = Math.PI;
    if (velocity.y === 1) rotation = Math.PI / 2;
    if (velocity.y === -1) rotation = -Math.PI / 2;
    ctx.rotate(rotation);
    ctx.fillStyle = '#2E7D32';
    ctx.beginPath();
    ctx.ellipse(2, 0, TILE_SIZE / 1.8, TILE_SIZE / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(4, -5, 4, 0, Math.PI * 2);
    ctx.arc(4, 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(6, -5, 2, 0, Math.PI * 2);
    ctx.arc(6, 5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function placeFood() {
    let valid = false;
    while (!valid) {
        food = { x: Math.floor(Math.random() * TILE_COUNT), y: Math.floor(Math.random() * TILE_COUNT) };
        valid = !snake.some(p => p.x === food.x && p.y === food.y);
    }
}

function increaseDifficulty() {
    if (gameSpeed > 80) {
        clearInterval(gameLoop);
        gameSpeed -= 2;
        gameLoop = setInterval(update, gameSpeed);
    }
}

function gameOver() {
    isGameRunning = false;
    clearInterval(gameLoop);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreEl.innerText = highScore;
    }
    finalScoreEl.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

function resetGame() { startGame(); }

// Correct Control Structure replacement for JS logic above
// This resets the structure to be a proper Cross/T shape
const controlsDiv = document.querySelector('.mobile-controls');
controlsDiv.innerHTML = `
            <div class="d-btn" id="btnUp">▲</div>
            <div class="control-row">
                <div class="d-btn" id="btnLeft">◀</div>
                <div class="d-btn" id="btnRight">▶</div>
            </div>
            <div class="d-btn" id="btnDown">▼</div>
        `;
// Re-attach listeners after overwriting HTML
setupBtn('btnUp', 'ArrowUp');
setupBtn('btnDown', 'ArrowDown');
setupBtn('btnLeft', 'ArrowLeft');
setupBtn('btnRight', 'ArrowRight');

draw();