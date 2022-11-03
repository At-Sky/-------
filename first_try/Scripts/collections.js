import {addFromCollections} from '/Scripts/cartAdd.js';
import {CatalogList} from '/Scripts/data.js';

const collectionItems = document.querySelector('.collection-items');
const collectionInfo = document.querySelector('.collection-info');

window.addEventListener('load', () => {

    let index = collectionInfo.classList[1];

    const filteredItems = CatalogList.filter(item => item.collection == index);
    displayCollectionItems(filteredItems);
});

const displayCollectionItems = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
            <div class="catalog_item">
                <a href="/Pages/items/item${item.id}.html" class="catalog_item_name">${item.shortName}</a>
                <p class="catalog_item_price">Цена:<strong> ${item.price}</strong></p>
                <button data-id="${item.id}" class="catalog_item_button">В корзину</button>
                <img class="catalog_item_image" src="${item.image}">
            </div>
            `;
        })
        .join('');
    collectionItems.innerHTML = htmlString;
    addFromCollections();
};