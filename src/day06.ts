import * as fs from 'fs';
import { Set } from 'immutable';

const dataStream = fs
    .readFileSync('input/day06.txt')
    .toString()
    .replaceAll(/\s+/g, '');

function findMarker(size) {
    let i = 0;
    while (i < dataStream.length - (size - 1)) {
        if (
            Set<string>(dataStream.substring(i, i + size).split('')).size ===
            size
        ) {
            return i + size;
        }
        i++;
    }
}

let packet = findMarker(4);
console.log(packet);

let message = findMarker(14);
console.log(message);
