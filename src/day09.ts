import * as fs from 'fs';
import Victor from 'victor';

const part2 = true;
const snakeSize = part2 ? 10 : 2;
const snake = [...Array(snakeSize)].map(() => new Victor(0, 0));
const head = snake[0];
const offsets = {
    L: new Victor(-1, 0),
    R: new Victor(1, 0),
    D: new Victor(0, -1),
    U: new Victor(0, 1)
};
let positions = [new Victor(0, 0)];

function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
}

function isAdjacent(p1: Victor, p2: Victor) {
    return p1.distance(p2) < Math.sqrt(3);
}

function moveSnakeSegment(first, follow) {
    const diffX = first.distanceX(follow);
    const diffY = first.distanceY(follow);
    if (Math.abs(diffX) > 0 && Math.abs(diffY) > 0) {
        follow.add(new Victor(clamp(diffX, -1, 1), clamp(diffY, -1, 1)));
    } else if (Math.abs(diffX) > 0) {
        follow.add(new Victor(diffX - Math.sign(diffX), 0));
    } else if (Math.abs(diffY) > 0) {
        follow.add(new Victor(0, diffY - Math.sign(diffY)));
    }
}

function moveSnake() {
    for (let i = 0; i < snakeSize - 1; i++) {
        const first = snake[i];
        const follow = snake[i + 1];
        if (!isAdjacent(first, follow)) {
            moveSnakeSegment(snake[i], snake[i + 1]);
            if (i + 1 === snakeSize - 1) {
                positions.push(new Victor(follow.x, follow.y));
            }
        }
    }
}

fs.readFileSync('input/day09.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .forEach((l) => {
        const [dir, nStr] = l.split(/\s+/);
        const n = Number(nStr);
        const offset: Victor = offsets[dir];
        for (let i = 0; i < n; i++) {
            head.add(offset);
            moveSnake();
        }
    });

positions = positions.filter(
    (p1, i) => i === positions.findIndex((p2) => p2.isEqualTo(p1))
);

console.log(positions.length);
