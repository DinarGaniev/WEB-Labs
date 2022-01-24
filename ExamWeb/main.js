'use strict'




function dowloadData(page = 1) {
    let url = "http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=2148a255-3abb-47c7-835c-9b499bb17e42";
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderDistrictList(this.response);// округ
        renderRegionList(this.response);// район
        renderTypeList(this.response);// тип заведения
    }
}

function renderDistrictList(records) {
    let districtList = document.getElementById('adminDistrict');
    let arrayDistrict = [0];
    let flag;
    for (let record of records) {
        for (let i = 0; i < arrayDistrict.length; i++) {
            if (record.adminDistrict != arrayDistrict[i]){
                flag = true;
            } else {
                flag = false;
                break;
            }

        }
        if (flag == true ){
            districtList.append(createDistrictElement(record));
            flag=0;
            arrayDistrict.push(record.adminDistrict);
        }
    }
}

window.onload = function () {
    dowloadData();
}