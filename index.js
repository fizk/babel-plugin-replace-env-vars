const add = (a, b) => a + b;
const mult = (a,b) => a * b;
const div = (a, b) => a / b;

const addMore = (a, b, c) => a + b + c;

const alp = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g'
];

const findTheLetter = letter => {
    for (let i = 0; i < alp.length; i++) {
        if(alp[i] === letter) {
            console.log('I found it, it is number ' + (i + 1));
        }
    }
};


findTheLetter('f');

