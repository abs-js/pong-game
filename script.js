const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 5,
    dy: 5,
    width: 10,
    height: 10,
    pause: false
};

const leftPaddle = {
    x: 40,
    y: canvas.height / 2 - 50,
    dx: 5,
    dy: 5,
    width: 10,
    height: 100
};

const rightPaddle = {
    x: 750,
    y: canvas.height / 2 - 50,
    dx: 5,
    dy: 5,
    width: 10,
    height: 100
};

const points = {
    house: 0,
    visit: 0
};

const keys = {
    up: false,
    down: false
};

function update() {
    if (!ball.pause) {
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    if (ball.y >= canvas.height || ball.y <= 0) {
        ball.dy = -ball.dy;
    }

    if (ball.x >= canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        points.house += 1;
        ball.dy = -ball.dy;
        ball.dx = -ball.dx;
        ball.pause = true;
        setTimeout(function() {
            ball.pause = false;
        }, 1000);
    }

    if (ball.x <= 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        points.visit += 1;
        ball.dy = -ball.dy;
        ball.dx = -ball.dx;
        ball.pause = true;
        setTimeout(function() {
            ball.pause = false;
        }, 1000);
    }

    isColliding(ball, leftPaddle, function(){
        ball.dx = -ball.dx;
    });

    isColliding(ball, rightPaddle, function(){
        ball.dx = -ball.dx;
    });

    movePaddles();
}

function movePaddles() {
    if (keys.up && leftPaddle.y >= 0) {
        leftPaddle.y -= 5;
    } else if (keys.down && leftPaddle.y <= canvas.height - leftPaddle.height) {
        leftPaddle.y += 5;
    }

    if (rightPaddle.y + 50 >= ball.y && rightPaddle.y >= 0) {
        rightPaddle.y -= 3;
    }

    if (rightPaddle.y + 50 <= ball.y && rightPaddle.y <= canvas.height - rightPaddle.height) {
        rightPaddle.y += 3;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.setLineDash([5, 15]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "48px serif";
    ctx.fillText(points.house + "   :   " + points.visit, 50, 50);
}

function isColliding(A, B, f) {
    if (A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.y + A.height > B.y) {
        f();
    }
}

document.addEventListener('keydown', function(e) {
    if(e.key === "ArrowUp") {
        keys.up = true;
    }

    if (e.key === "ArrowDown") {
        keys.down = true;
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === "ArrowUp") {
        keys.up = false;
    }

    if (e.key === "ArrowDown") {
        keys.down = false;
    }
});

function main() {
    update();
    draw();
    requestAnimationFrame(main);
}

main();
