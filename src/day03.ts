import * as fs from 'fs';
import { Set } from 'immutable';
import _ from 'lodash';

let sum = fs
    .readFileSync('input/day03.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n')
    .map((l) => {
        const [c1, c2] = [
            l.substring(0, l.length / 2),
            l.substring(l.length / 2)
        ];
        const c = Set<string>(c1.split(''))
            .intersect(Set<string>(c2.split('')))
            .toJSON()[0];
        return (
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) +
            1
        );
    })
    .reduce((a, v) => a + v, 0);

console.log(sum);

const arr = fs
    .readFileSync('input/day03.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n');

sum = _.chunk(arr, 3)
    .map(([e1, e2, e3]) => {
        const c = Set<string>(e1.split(''))
            .intersect(Set<string>(e2.split('')))
            .intersect(Set<string>(e3.split('')))
            .toJSON()[0];
        return (
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) +
            1
        );
    })
    .reduce((a, v) => a + v, 0);

console.log(sum);
