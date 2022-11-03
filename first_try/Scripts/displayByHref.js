import {CatalogList, _MoreAboutItems} from '/Scripts/data.js';
import {cartCounter, addFromItems} from '/Scripts/cartAdd.js';

const currentItem = document.querySelector('.current_item');
const img = document.querySelector('.item-info_img');
const name = document.querySelector('.item-info_name');
const size = document.querySelector('.item-info_size');
const id = document.querySelector('.item-info_articul > span');
const button = document.querySelector('.item-info_button')
const price = document.querySelector('.item-info_price');
const about = document.querySelector('.item-info_about');
const usage = document.querySelector('.item-info_usage');
const active = document.querySelector('.item-info_active');
const ingredients = document.querySelector('.item-info_ingredients');

window.addEventListener('load', () => {
    let href = location.href;
    let itemId = href.split('items/')[1].replace(/\D/g,'')
    let filteredFrom1 = CatalogList.filter(item => item.id == itemId);
    let filteredFrom2 = _MoreAboutItems.filter(item => item.id == itemId);
    if (itemId > 29 && itemId < 36) {
        displayAromaNotes(filteredFrom2);
    } else {
        displayUsage(filteredFrom2);
    }
    displayMapLine(filteredFrom1);
    displayImg(filteredFrom1);
    displayName(filteredFrom1);
    displaySize(filteredFrom2);
    displayId(filteredFrom2);
    displayPrice(filteredFrom1);
    displayAbout(filteredFrom2);
    displayActive(filteredFrom2);
    displayIngredients(filteredFrom2);
    dataIdMarker(filteredFrom1);
});

const displayMapLine = (items) => {
    const htmlString = items        
    .map((item) => {
        return `
            ${item.name}
        `;
    })
    .join('');
    currentItem.innerHTML = htmlString;
};

const displayImg = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.image}
            `;
        })
        .join('');
    img.src = htmlString;
};

const displayName = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.name}
            `;
        })
        .join('');
    name.innerHTML = htmlString;
};

const displaySize = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.size}
            `;
        })
        .join('');
    size.innerHTML = htmlString;
};

const displayId = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.id}
            `;
        })
        .join('');
    id.innerHTML = htmlString;
};

const displayPrice = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.price}
            `;
        })
        .join('');
    price.innerHTML = htmlString;
};

const displayAbout = (items) => {
    const mainString = items        
        .map((item) => {
            return `
                ${item.about}
            `;
        })
        .join('');
    about.firstElementChild.innerHTML = mainString;

    if (items[0].addition == undefined || items[0].addition == ``) {
        about.lastChild.innerHTML = '';
    } else {
        const additionString = items        
        .map((item) => {
            return `
                ${item.addition}
            `;
        })
        .join('');
        about.lastElementChild.style.marginTop = '15px';
        about.lastElementChild.innerHTML = additionString;
    }
};

const displayUsage = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.usage}
            `;
        })
        .join('');
    if (htmlString.trim() == '') {
        usage.firstElementChild.innerHTML = ''
    }
    
    usage.lastElementChild.innerHTML = htmlString;
};

const displayAromaNotes = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.aroma}
            `;
        })
        .join('');
    if (htmlString.trim() == '') {
        usage.firstElementChild.innerHTML = ''
    }
    usage.firstElementChild.innerHTML = 'ПИРАМИДА АРОМАТА:'
    usage.lastElementChild.innerHTML = htmlString;
};

const displayActive = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.active}
            `;
        })
        .join('');
    if (htmlString.trim() == '') {
        active.firstElementChild.innerHTML = ''
    }

    active.lastElementChild.innerHTML = htmlString;
};

const displayIngredients = (items) => {
    const htmlString = items        
        .map((item) => {
            return `
                ${item.ingredients}
            `;
        })
        .join('');
    if (htmlString.trim() == '') {
        ingredients.firstElementChild.innerHTML = ''
    }
    
    ingredients.lastElementChild.innerHTML = htmlString;
};

const dataIdMarker = (items) => {
    const htmlString = items        
        .map((item) => { return item.id })
        .join('');
    button.setAttribute('data-id', htmlString);
}

addFromItems();