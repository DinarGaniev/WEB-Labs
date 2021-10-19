'use strict';

function gcd(a, b) {
    let x = 1;
    while (a != 0 && b != 0) {
        if (a > b) a = a % b;
        else b = b % a;
        x = a + b;
    }
    return x;
}

console.log(gcd(45, 18));
