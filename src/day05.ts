import * as fs from 'fs';

const [init, moves] = fs
    .readFileSync('input/day05.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n\n');

const [numbers, ...elements] = init.split('\n').reverse();

const stacks = {};

numbers
    .trim()
    .split(/\s+/)
    .forEach((n) => (stacks[n] = []));

elements.forEach((r) => {
    for (let i = 0; i < r.length / 4; i++) {
        const item = r.substring(i * 4, i * 4 + 3);
        const match = item.match(/\[(.)]/);
        if (match) {
            stacks[`${i + 1}`].push(match[1]);
        }
    }
});

const part2 = true;

moves.split('\n').forEach((m) => {
    const [_, n, start, target] = [
        ...m.match(/^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/)
    ];
    const crates = stacks[start].splice(-n, n);
    stacks[target].push(...(part2 ? crates : crates.reverse()));
});

console.log(
    Object.values(stacks)
        .map((s) => (s as string[]).pop())
        .join('')
);
