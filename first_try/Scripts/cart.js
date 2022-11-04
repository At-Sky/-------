import {CatalogList} from '/first_try/Scripts/data.js';
import {cartCounter, cartUpdate} from '/first_try/Scripts/cartAdd.js';
//cart
const cart = document.querySelector('.cart');
const cartPlace = document.querySelector('.cart-place');
const cartSummary = document.querySelector('.cart-summary');

let buyQuantity = 0;
let buySummary = 0;
export let productArray = [];
let finalPrice = 0;

const getFromStorage = (buyList) => {
    let filteredKeys = Object.keys(localStorage).sort();
    for(let key of filteredKeys) { 
        if (key != 'item') {
            buyList[key] = localStorage.getItem(key);
        }
    }
}

let repetitions; //понадобится чтобы менять в плюс и минус в элементах
let buyList = [];

const addToBuyList = () => {
    getFromStorage(buyList);
    buyQuantity = buyList.filter(Boolean).length;

    if (buyList.length > 0) {

        let filteredItems = CatalogList.filter(item => buyList.includes(item.id));

        repetitions = buyList.reduce((acc, rec, index) => {  //ищем повторения в корзине
            return (typeof acc[rec] !== 'undefined') 
              ? { ...acc, [rec]: acc[rec] + 1 } 
              : { ...acc, [rec]: 1 }
        }, {})

        let withAmount = filteredItems.map(item => ({item, amount: 1}));    //добавляем количество

        withAmount.forEach(item => {
                item.amount = repetitions[item.item.id]; //количество каждого элемента в корзине
                productArray.push(item); //добавление предметов в массив для отправки на почту
        })

        cartSummary.style.display = 'flex';
        displayCartItems(withAmount);
    };
};

const repsUpdate = () => {
    repetitions = buyList.reduce((acc, rec, index) => {  //ищем повторения в корзине
        return (typeof acc[rec] !== 'undefined') 
          ? { ...acc, [rec]: acc[rec] + 1 } 
          : { ...acc, [rec]: 1 }
    }, {})
}

const displayCartItems = (items) => {
    if (items.length == 1) {
        cartPlace.style.minHeight = '300px'
    }

    if (document.documentElement.clientWidth < 780) {
        cartPlace.style.minHeight = '150px'
    }
    
    cart.style.marginTop = '0px';
    const htmlString = items        
        .map((elem) => {
            return `
            <div class="cart_item">
                <a href="/Pages/items/item${elem.item.id}.html" class="cart_item_name">${elem.item.shortName}</a>
                <p class="cart_item_price">Цена:<strong> ${elem.item.price}</strong></p>
                <p class="price_with_value">Итого: <strong>${elem.item.price.split(' ')[0] * elem.amount} ₽</strong></p>
                <div data-id="${elem.item.id}" class="cart_item_counter flex">
                    <button class="counter-button_minus">-</button>
                    <p class="counter_number">${elem.amount}</p>
                    <button class="counter-button_plus">+</button>
                </div>
                <img class="cart_item_image" src="${elem.item.image}"></img>
                <svg class="cart-item_cross" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    width="15px" height="15px" viewBox="0 0 94.926 94.926" style="enable-background:new 0 0 94.926 94.926;"
                    xml:space="preserve">
                <g>
                    <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
                        c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
                        c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
                        c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
                        s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
                </g>
                </svg>
            </div> 
            `;
        })
        .join('');
        cart.innerHTML = htmlString;
        let cartItems = document.querySelectorAll('.cart_item');
        cartItems.forEach(item => {
            item.childNodes[1].addEventListener('click', () => {
                localStorage.setItem('item', item.childNodes[5].getAttribute('data-id'));
            })
        })
};

addToBuyList();

const plusControls = document.querySelectorAll('.counter-button_plus');
const minusControls = document.querySelectorAll('.counter-button_minus');
const cartCrosses = document.querySelectorAll('.cart-item_cross');

plusControls.forEach(item => {
    let dataId = item.parentElement.getAttribute('data-id');
    const ticketSummary = document.querySelector('.ticket-summary');
    item.addEventListener('click', () => {
        console.log(buySummary)
        localStorage.setItem(`${cartCounter + 1}`, dataId);
        item.previousElementSibling.innerHTML = Number(item.previousElementSibling.innerHTML) + 1;
        location.reload();
        // updatePage(item);
        // cartUpdate();
        // productArray.forEach(item => {
        //     console.log(item)
        //     finalPrice += Number(item.item.price.split(' ')[0]) * item.amount;
        // });
        // buySummary = finalPrice
        // ticketSummary.innerHTML = `${finalPrice} ₽`;
    });
})

cartCrosses.forEach(item => {
    let dataId = item.previousElementSibling.previousElementSibling.getAttribute('data-id');

    item.addEventListener('click', () => {
        let list = [];
        getFromStorage(list);
        let filteredItems = CatalogList.filter(item => list.includes(item.id));
        let withAmount = filteredItems.map(item => ({item, amount: 1}));
        let indices = [];
        let index = list.indexOf(dataId) 
        while (index != -1) {
            indices.push(index);
            index = list.indexOf(dataId, index + 1);
        }

        indices.forEach(item => {
            localStorage.removeItem(item);
        })
        // updatePage(item);
        location.reload();
        // displayCartItems(withAmount);
    });

})


minusControls.forEach(item => {
    // console.log(item.parentElement.parentElement.childNodes[3].innerHTML.split(' ')[1])

    item.addEventListener('click', () => {
        let dataId = item.parentElement.getAttribute('data-id');
        let list = [];
        getFromStorage(list);

        if (Number(item.nextElementSibling.innerHTML) == 1) {
            item.nextElementSibling.innerHTML = Number(item.nextElementSibling.innerHTML);
            localStorage.removeItem(list.indexOf(dataId));
            location.reload();
            // updatePage(item);
    
        } else {
            item.nextElementSibling.innerHTML = Number(item.nextElementSibling.innerHTML) - 1;
            // console.log(list.indexOf(dataId))
            localStorage.removeItem(list.indexOf(dataId));
            location.reload();
            // updatePage(item);
            // let price = 0;
            // productArray.forEach(item => {
            //     console.log(item)
            //     price += Number(item.item.price.split(' ')[0]);
            // });
            // ticketSummary.innerHTML = `${price} ₽`;
            // updateMinus(item, dataId, list);
        };
    });
})

const ticketSummary = document.querySelector('.ticket-summary');

const countSummary = () => {
    let finalPrice = 0;
    // repsUpdate();
    let a = [];
    getFromStorage(a);
    
    repetitions = a.reduce((acc, rec, index) => {  //ищем повторения в корзине
        return (typeof acc[rec] !== 'undefined') 
          ? { ...acc, [rec]: acc[rec] + 1 } 
          : { ...acc, [rec]: 1 }
    }, {})
    if (repetitions == undefined) {
        return 0;
    } else {
        CatalogList.filter(item => {
            if(Object.keys(repetitions).includes(item.id)){
                // console.log(repetitions[item.id])
                finalPrice += Number(item.price.split(' ')[0]) * repetitions[item.id];
            }
            
        });
    }

    buySummary = finalPrice;

    ticketSummary.innerHTML = `${finalPrice} ₽`;
}

countSummary();


const addProductArray = () => {
    // cartUpdate();
    // // console.log(buyList, 0);
    // let formArray = [];
    // let e = []
    // getFromStorage(e, 1);
    // buyQuantity = buyList.filter(Boolean).length;
    // console.log(buyList)
    // console.log(buySummary)
    // let repetitions = [];
    // // getFromStorage(list);
    // let filteredItems = CatalogList.filter(item => buyList.includes(item.id));
    // let withAmount = filteredItems.map(item => ({item, amount: 1}));
    // console.log(withAmount)

    // repetitions = buyList.reduce((acc, rec, index) => {  //ищем повторения в корзине
    //     return (typeof acc[rec] !== 'undefined') 
    //       ? { ...acc, [rec]: acc[rec] + 1 } 
    //       : { ...acc, [rec]: 1 }
    // });

    // withAmount.forEach(item => {
    //     item.amount = repetitions[item.item.id]; //количество каждого элемента в корзине
    //     formArray.push(item); //добавление предметов в массив для отправки на почту
    // });
    // console.log(formArray, 1);
    
    const form = document.querySelector('.order');
    form.querySelector('[name="Товары"]').value = JSON.stringify(productArray);
    console.log(form.querySelector('[name="Товары"]').value)
}


const modal = new GraphModal({
    isOpen: (modal) => {
        console.log('opened');
        console.log(productArray, 3);
        const quant = document.querySelector('.order-modal__quantity');
        const summ = document.querySelector('.order-modal__summ');
        
        addProductArray();

        const changeModalValue = (summary, quantity) => {
            quant.firstElementChild.innerHTML = `${quantity}`;
            summ.firstElementChild.innerHTML = `${summary} ₽`;
        }

        changeModalValue(buySummary, buyQuantity);
    }, 
    isClose: () => {
        console.log('closed');
    }
});

const updatePage = (item) => {
    cartUpdate();
    getFromStorage(buyList);
    buyQuantity = buyList.filter(Boolean).length;

    if (buyList.length > 0) {
        let filteredItems = CatalogList.filter(el => buyList.includes(el.id));

        repetitions = buyList.reduce((acc, rec, index) => {  //ищем повторения в корзине
            return (typeof acc[rec] !== 'undefined') 
              ? { ...acc, [rec]: acc[rec] + 1 } 
              : { ...acc, [rec]: 1 }
        }, {})

        let withAmount = filteredItems.map(item => ({item, amount: 1}));    //добавляем количество

        withAmount.forEach(el => {
            el.amount = repetitions[el.item.id]; //количество каждого элемента в корзине
            productArray.forEach(e => {
                if (e.item.id == el.item.id) {
                    e.amount = el.amount;
                }
            })
        })
    };
    countSummary();
    item.parentElement.previousElementSibling.firstElementChild.innerHTML = `${item.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerHTML.split(' ')[1] * Number(item.previousElementSibling.innerHTML)} ₽`;
}

const updateMinus = (item, dataId) => {
    let a = [];
    cartUpdate();
    getFromStorage(a);
    console.log(a)
    if (a.length > 0) {
        let filteredItems = CatalogList.filter(el => a.includes(el.id));

        repetitions = a.reduce((acc, rec, index) => {  //ищем повторения в корзине
            return (typeof acc[rec] !== 'undefined') 
              ? { ...acc, [rec]: acc[rec] + 1 } 
              : { ...acc, [rec]: 1 }
        }, {})
        // repsUpdate();
        console.log(repetitions)

        let withAmount = filteredItems.map(item => ({item, amount: 1}));    //добавляем количество

        // console.log(withAmount)
        // console.log(1)

        withAmount.forEach(el => {
            el.amount = repetitions[el.item.id]; //количество каждого элемента в корзине
            productArray.forEach(e => {
                if (e.item.id == el.item.id) {
                    e.amount = el.amount;
                }
            })
        })
    };
    countSummary();
    console.log(productArray)
    item.parentElement.previousElementSibling.firstElementChild.innerHTML = `${item.parentElement.parentElement.childNodes[3].innerHTML.split(' ')[1] * Number(item.nextElementSibling.innerHTML)} ₽`;
    buyQuantity = a.filter(Boolean).length;
}