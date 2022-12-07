import * as fs from 'fs';

const input = fs
    .readFileSync('input/day07.txt')
    .toString()
    .replaceAll('\r', '')
    .split('\n');

interface FileSystemNode {
    type: 'dir' | 'file';
    name: string;
    size: number;
    parent: FileSystemNode;
    children: { [key: string]: FileSystemNode };
}

const root: FileSystemNode = {
    type: 'dir',
    name: '',
    size: 0,
    parent: null,
    children: {}
};

function printFileSystem(
    node: FileSystemNode = root,
    print: (str) => void = (str) => process.stdout.write(str),
    indent = '',
    last = 2
) {
    if (!node) return;

    print(indent);

    switch (last) {
        case 0:
            print('├───');
            indent += '│   ';
            break;
        case 1:
            print('└───');
            indent += '    ';
            break;
    }

    print(`${node.name} (${node.type}, size=${node.size})\n`);

    Object.values(node.children).forEach((c, i) =>
        printFileSystem(
            c,
            print,
            indent,
            i == Object.keys(node.children).length - 1 ? 1 : 0
        )
    );
}

let sum = 0;
function directorySize(node: FileSystemNode = root) {
    const size = Object.values(node.children).reduce((total, child) => {
        if (child.type === 'file') return total + child.size;
        return total + directorySize(child);
    }, 0);
    node.size = size;
    if (size <= 100000) sum += size;
    return size;
}

function directoryPath(node: FileSystemNode) {
    let path = node.name;
    while ((node = node.parent) != null) {
        path = `${node.name}/${path}`;
    }
    return path;
}

let node = root;
while (input.length > 0) {
    const line = input.shift().trim();
    if (!line.startsWith('$')) continue;

    // Get command and args
    const [_, command] = line.match(/^\$\s+(.*)$/);
    const [exec, ...args] = command.split(/\s+/);
    const output = [];

    // Get command output
    while (input.length > 0 && !input[0].startsWith('$')) {
        output.push(input.shift());
    }

    // Process command
    switch (exec) {
        case 'cd':
            const dir = args[0];
            switch (dir) {
                case '..':
                    node = node.parent;
                    break;
                case '/':
                    node = root;
                    break;
                default:
                    node = Object.values(node.children).find(
                        (d) => d.name === dir
                    );
                    break;
            }
            break;
        case 'ls':
            output
                .map((o) => o.split(/\s+/))
                .forEach(([first, second]) => {
                    const isDir = first === 'dir';
                    node.children[second] = {
                        type: isDir ? 'dir' : 'file',
                        name: second,
                        size: isDir ? 0 : Number(first),
                        parent: node,
                        children: {}
                    };
                });
            break;
    }
}

directorySize();
printFileSystem();
console.log(sum);

const spaceAvailable = 70000000;
const spaceUnused = spaceAvailable - root.size;
const spaceNeeded = 30000000 - spaceUnused;

let dirToDelete: FileSystemNode = null;
function chooseDirectory(node: FileSystemNode = root) {
    if (
        node.size >= spaceNeeded &&
        (!dirToDelete || node.size < dirToDelete.size)
    ) {
        dirToDelete = node;
    }
    Object.values(node.children).forEach((c) => chooseDirectory(c));
}

chooseDirectory();
console.log(`${directoryPath(dirToDelete)} (size=${dirToDelete.size})`);
