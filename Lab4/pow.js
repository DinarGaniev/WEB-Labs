'use strict';

function pow(x, n) {
    let result = 1;
    if (n < 1) return "Введите n >= 1";
    else {
        for (let i = 0; i < n; i++) {
            result *= x;
        }
        return result;
    }
}

console.log(pow(4, 3));
