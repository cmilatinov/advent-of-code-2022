import * as fs from 'fs';
import { Set } from 'immutable';

function toSet(range) {
    const [start, end] = range.split('-').map((s) => Number(s));
    const numbers = [];
    for (let i = start; i <= end; i++) {
        numbers.push(i);
    }
    return Set<number>(numbers);
}

let numOccurrences = fs
    .readFileSync('input/day04.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .reduce((acc, line) => {
        const [first, second] = line.split(',').map(toSet);
        const intersection = first.intersect(second);
        if (!intersection.equals(first) && !intersection.equals(second))
            return acc;
        return acc + 1;
    }, 0);

console.log(numOccurrences);

numOccurrences = fs
    .readFileSync('input/day04.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .reduce((acc, line) => {
        const [first, second] = line.split(',').map(toSet);
        if (first.intersect(second).isEmpty()) return acc;
        return acc + 1;
    }, 0);

console.log(numOccurrences);
