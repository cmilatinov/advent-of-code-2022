import * as fs from 'fs';

let largestValue = 0;
let largestIndex = -1;

const arr = fs
    .readFileSync('input/day01.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n\n')
    .map((s) =>
        s
            .split('\n')
            .map((n) => Number(n))
            .reduce((a, v) => a + v, 0)
    );

let sum = 0;
for (let i = 0; i < 3; i++) {
    arr.forEach((n, i) => {
        if (n > largestValue) {
            largestIndex = i;
            largestValue = n;
        }
    });

    arr.splice(largestIndex, 1);
    sum += largestValue;
    largestIndex = -1;
    largestValue = 0;
}

console.log(sum);
