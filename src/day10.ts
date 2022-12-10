import * as fs from 'fs';

const signalStrengths = [];
const pixels = [];

let currentCycle = 0;
let x = 1;

function signalStrength() {
    return x * currentCycle;
}

function pixel() {
    return Math.abs(((currentCycle - 1) % 40) - x) <= 1 ? '#' : '.';
}

function cycle() {
    currentCycle++;
    if (Number.isInteger((currentCycle - 20) / 40)) {
        signalStrengths.push(signalStrength());
    }
    const p = pixel();
    if (currentCycle % 40 === 1) {
        pixels.push([p]);
    } else {
        pixels[pixels.length - 1].push(p);
    }
}

function exec(instruction, operand) {
    switch (instruction) {
        case 'noop':
            cycle();
            break;
        case 'addx':
            cycle();
            cycle();
            x += Number(operand);
            break;
    }
}

fs.readFileSync('input/day10.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .forEach((i) => {
        const [instruction, operand] = i.split(/\s+/);
        exec(instruction, operand);
    });

console.log(signalStrengths.reduce((a, v) => a + v, 0));
console.log(pixels.map((t) => t.join('')).join('\n'));
