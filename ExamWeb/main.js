'use strict'




function dowloadData(page = 1) {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderAdmAreaList(this.response);// округ
        renderDistrictList(this.response);// район
        renderTypeList(this.response);// тип заведения
    }
}

function renderAdmAreaList(records) {
    let admAreaList = document.getElementById('adminDistrict');
    let arrayAdmArea = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayAdmArea.length; i++) {
            if (record.admArea != arrayAdmArea[i]){
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true ){
            admAreaList.append(createDistrictElement(record));
            flag=0;
            arrayAdmArea.push(record.admArea);
        }
    }
}

window.onload = function () {
    dowloadData();
}