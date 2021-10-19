'use strict';

function pluralizeRecords(n) {
    if (n % 10 == 1 && n % 100 != 11) {
        let sentence1;
        sentence1 = "В результате выполнения запроса была найдена" + " " + n + " " + "запись.";
        return sentence1;
    }
    else if ((n % 10 >= 2 && n % 10 <= 4) && (n % 100 != 12 && n % 100 != 13 && n % 100 != 14)) {
        let sentence2;
        sentence2 = "В результате выполнения запроса были найдены" + " " + n + " " + "записи.";
        return sentence2;
    }
    else if ((n % 10 == 0 || (n % 10 >= 5 && n % 10 <= 9)) || (n % 100 >= 11 && n % 100 <= 14)) {
        let sentence3;
        sentence3 = "В результате выполнения запроса было найдено" + " " + n + " " + "записей.";
        return sentence3;
    }
}

console.log(pluralizeRecords(1012213))
