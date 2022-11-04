import {CatalogList} from '/first_try/Scripts/data.js';
import {addToCart} from '/first_try/Scripts/cartAdd.js';
import { displayCartCounter } from '/first_try/Scripts/cartAdd.js';

//catalog

const catalogItemsList = document.querySelector('.catalog_items_list');
const itemTypes = document.querySelectorAll('.catalog_title');

itemTypes.forEach(elem => {
    elem.addEventListener('click', () => {
        itemTypes.forEach(elem => {
            elem.firstChild.classList.remove('show');
            elem.firstChild.nextSibling.classList.remove('show');
            // elem.style.backgroundColor = 'transparent';
            elem.style.opacity = 1;
        })
        let index = Array.from(itemTypes).indexOf(elem);
        let type = '';

        if (index == 0) {
            type = 'face'
        } else if (index == 1) {
            type = 'body'
        } else if (index == 2) {
            type = 'hair'
        } else if (index == 3) {
            type = 'makeup'
        } else if (index == 4) {
            type = 'perfumery'
        } else if (index == 5) {
            type = 'complex solutions'
        } else if (index == 6) {
            type = 'aromatherapy'
        }

        elem.firstElementChild.classList.add('show');
        let currentWidth = elem.lastChild.firstElementChild.firstElementChild.offsetWidth;
        elem.firstElementChild.nextSibling.classList.add('show');
        elem.firstElementChild.style.width = `${currentWidth}px`;
        // elem.style.backgroundColor = '#e9e9e9';
        elem.style.opacity = 0.65;
        elem.style.borderBottom = 'none';
        const filteredItems = CatalogList.filter(item => item.type == type);
        displayCatalogItems(filteredItems);
        addToCart();
    });
});

const displayCatalogItems = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
            <div class="catalog_item">
                <a href="/Pages/items/item${item.id}.html" class="catalog_item_name">${item.shortName}</a>
                <p class="catalog_item_price">Цена:<strong> ${item.price}</strong></p>
                <button data-id="${item.id}" class="catalog_item_button">В корзину</button>
                <img class="catalog_item_image" src="${item.image}"></img>
            </div>
            `;
        })
        .join('');
    catalogItemsList.innerHTML = htmlString;
    let catalogItems = document.querySelectorAll('.catalog_item');
    catalogItems.forEach(item => {
        item.childNodes[1].addEventListener('click', () => {
            localStorage.setItem('item', item.childNodes[5].getAttribute('data-id'))
        })
    })
};