'use strict';

function createUpvotesElement(num) {
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.textContent = num;
    return upvotesElement;
}

function createAuthorElement(user) {
    user = user || { name: { first: '', last: '' } }
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.textContent = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('footer');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record.user));
    footerElement.append(createUpvotesElement(record.upvotes));
    return footerElement;
}

function createContentElement(record) {
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let record of records) {
        factsList.append(createListItemElement(record))
    }
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
    document.querySelector('.current-interval-start').innerHTML = start;
    let end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-end').innerHTML = end;


}

function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    btn.classList.add(...classes);
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    if (info.total_count == 0) {
        return;
    }

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = '???????????? ????????????????';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns')
    paginationContainer.append(buttonsContainer);

    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
    }

    btn = createPageBtn(info.total_pages, ['first-page-btn']);
    btn.innerHTML = '?????????????????? ????????????????';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}

function downloadData(page = 1) {
    let factsList = document.querySelector('.facts-list');
    let perPage = document.querySelector('.per-page-btn').value;
    let url;
    if (newUrl == null) {
        url = new URL(factsList.dataset.url);
    }
    else {
        url = new URL(newUrl);
    }
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    }
    xhr.send();
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}

function perPageBtnHandler(event) {
    downloadData(1);
}

window.onload = function () {
    downloadData();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;
    let searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', perSeacrchBtnHandler);
    document.getElementById('search-field').oninput = emersionInputList;
    let listelem = document.querySelector('.list-choice');
    listelem.addEventListener('click', clickElemList);
}

let newUrl = null;

function perSeacrchBtnHandler(event) {
    let input = document.querySelector('input');
    let newDataUrl = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/facts');
    newDataUrl.searchParams.append('q', input.value);
    newUrl = newDataUrl;
    let li;
    if (li = event.target) {
        let ul = document.getElementById('list');
        ul.innerHTML = '';
    }
    downloadData();
}

function emersionInputList(event) {
    let input = document.querySelector('input');
    let requestURL = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete');
    requestURL.searchParams.append('q', input.value);
    if (event.target) {
        let ul = document.getElementById('list');
        ul.innerHTML = '';
        downloadInput(requestURL);
    }
}

function downloadInput(requestURL) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.responseType = 'json';
    xhr.onload = function () {
        createListInput(this.response);
    }
    xhr.send();
}

function createListInput(arrayList) {
    let ul = document.getElementById('list');
    for (let i = 0; i < arrayList.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = arrayList[i];
        ul.append(li);
    }
}

function clickElemList(event) {
    let li = event.target;
    let input = document.querySelector('input');
    let newDataUrl = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/facts');
    newDataUrl.searchParams.append('q', li.innerHTML);
    newUrl = newDataUrl;
    let ul = document.getElementById('list');
    ul.innerHTML = '';
    input.value = li.innerHTML;
    downloadData();
}