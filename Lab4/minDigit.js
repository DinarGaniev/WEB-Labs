'use strict';

function minDigit(x) {
    let min = x;
    while (x > 0) {
        let num;
        num = x % 10;
        if (num < min) {
            min = num;
        }
        else {
            num = num;
        }
        x = Math.trunc(x / 10);
    }
    return min
}

console.log(minDigit(1322));
