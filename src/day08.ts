import * as fs from 'fs';
import Victor from 'victor';

const grid = fs
    .readFileSync('input/day08.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)));

const size = new Victor(grid.length, grid[0].length);

function isValidCoords(coords) {
    return (
        coords.x >= 0 && coords.x < size.x && coords.y >= 0 && coords.y < size.y
    );
}

function viewDistances(x, y, edge = true) {
    const offsets = [
        new Victor(1, 0),
        new Victor(-1, 0),
        new Victor(0, 1),
        new Victor(0, -1)
    ];
    return offsets.map((o) => {
        const coords = new Victor(x, y);
        let height = grid[coords.x][coords.y];
        let dist = 0;
        while (true) {
            dist++;
            coords.add(o);
            if (!isValidCoords(coords)) return edge ? dist : dist - 1;
            if (grid[coords.x][coords.y] >= height) return dist;
        }
    });
}

function isTreeVisible(x, y) {
    const [d1, d2, d3, d4] = viewDistances(x, y);
    return d1 >= size.x - x || d2 > x || d3 >= size.y - y || d4 > y;
}

let numTreesVisible = 2 * (size.x + size.y - 2);
for (let x = 1; x < size.x - 1; x++) {
    for (let y = 1; y < size.y - 1; y++) {
        if (isTreeVisible(x, y)) numTreesVisible++;
    }
}

console.log(numTreesVisible);

let maxScenicScore = 0;
for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
        const score = viewDistances(x, y, false).reduce((t, v) => t * v, 1);
        maxScenicScore = Math.max(maxScenicScore, score);
    }
}

console.log(maxScenicScore);
