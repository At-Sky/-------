import {CatalogList} from '/Scripts/data.js';


let list;
let bar;

const searchList = document.querySelector('.search_list');
const searchBar = document.querySelector('.search_bar');
const overlay = document.querySelector('.overlay');
const navSearchList = document.querySelector('.nav_search_list');
const navSearchBar = document.querySelector('.nav_search_bar');

if(document.documentElement.clientWidth > 1040 && searchList) {
    list = searchList;
    bar = searchBar;
} else {
    list = navSearchList;
    bar = navSearchBar;
}

bar.addEventListener("click", () => {
    list.classList.add('open');
    overlay.classList.add('add_overlay');
});

overlay.addEventListener("click", () => {
    list.classList.remove('open');
    overlay.classList.remove('add_overlay');
});

bar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredItems = CatalogList.filter((item) => {
        return (
            item.shortName.toLowerCase().includes(searchString) ||
            item.price.toLowerCase().includes(searchString)
        );
    });
    displayitems(filteredItems);
});


const displayitems = (items) => {
    if (items.length < CatalogList.length && items.length > 1) {
        list.style.minHeight = '250px';
        const htmlString = items
            .map((item) => {
                return `
                <li class="item">
                    <a href="/Pages/items/item${item.id}.html" data-id="${item.id}" class="item_a">${item.shortName}</a>
                    <p class="item_p">Цена: <strong> ${item.price}</strong></p>
                    <img class="item_img" src="${item.image}"></img>
                </li>
                `;
            })
            .join('');
        list.innerHTML = htmlString;
        let itemsList = document.querySelectorAll('.item');
        itemsList.forEach(item => {
            item.childNodes[1].addEventListener('click', () => {
                localStorage.setItem('item', item.childNodes[1].getAttribute('data-id'))
            })
        })
    } else if (items.length == CatalogList.length) {
        list.style.minHeight = '50px';
        list.style.fontSize = '14px';
        const htmlString = 
            `
                <li class="item">
                    <p>Нет результатов! Попробуйте еще раз</p>
                </li> 
            `;
            list.innerHTML = htmlString; 
    } else if (items.length == 1) {
        list.style.minHeight = '140px';
        const htmlString = items
            .map((item) => {
                return `
                <li class="item">
                    <a href="/Pages/item.html" class="item_a">${item.shortName}</a>
                    <p class="item_p">Цена:<strong> ${item.price}</strong></p>
                    <img class="item_img" src="${item.image}"></img>
                </li>
                `;
            })
            .join('');
            list.innerHTML = htmlString; 
            let itemsList = document.querySelectorAll('.item');
            itemsList.forEach(item => {
                item.childNodes[1].addEventListener('click', () => {
                    localStorage.setItem('item', item.childNodes[1].getAttribute('data-id'))
                })
            })
    }
}