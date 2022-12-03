import * as fs from 'fs';

function numPoints(p1, p2) {
    if (p1 === p2) return 3;
    return (p1 + 1) % 3 === p2 ? 6 : 0;
}

let sum = fs
    .readFileSync('input/day02.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .map((r) => {
        const input = r.split(' ');
        let [other, me] = input.map((c) => c.charCodeAt(0));
        const [otherBase, meBase] = ['A', 'X'].map((c) => c.charCodeAt(0));
        other -= otherBase;
        me -= meBase;
        return numPoints(other, me) + me + 1;
    })
    .reduce((a, v) => a + v, 0);

console.log(sum);

// 0 1 2
function move(p1, outcome) {
    const mod = (p1 + outcome) % 3;
    return mod >= 0 ? mod : 3 + mod;
}

sum = fs
    .readFileSync('input/day02.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .map((r) => {
        const input = r.split(' ');
        let [other, outcome] = input.map((c) => c.charCodeAt(0));
        const [otherBase, outcomeBase] = ['A', 'Y'].map((c) => c.charCodeAt(0));
        other -= otherBase;
        outcome -= outcomeBase;
        const me = move(other, outcome);
        return numPoints(other, me) + me + 1;
    })
    .reduce((a, v) => a + v, 0);

console.log(sum);
