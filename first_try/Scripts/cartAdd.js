//метод вызывается в catalog.js
export let cartCounter = 0; //используется в cart.js чтобы увеличить/уменшить кол-во предметов


export let cartUpdate = () => {
    const a = (buyList) => {
        let filteredKeys = Object.keys(localStorage).sort();
        for(let key of filteredKeys) { 
            if (key != 'item') {
                buyList[key] = localStorage.getItem(key);
            }
        }
    }
    
    if (localStorage.getItem('item')) {
        let buyList = [];
        a(buyList)
        cartCounter = buyList.length - 1;
    } else {
        let buyList = [];
        a(buyList)
        cartCounter = buyList.length;
    }
}

cartUpdate();

export let displayCartCounter = () => { //pink counter for each display size in menu
    let carts = document.querySelectorAll('.cart-counter');
    if ((localStorage.length > 1 && localStorage.getItem('item')) || (localStorage.length > 0 && !localStorage.getItem('item'))) {
        if(document.documentElement.clientWidth > 1040) {
            carts[0].classList.add('show');
            carts[0].style.opacity = 1;
            carts[0].style.visibility = 'visible';
            // carts[0].style.top = '5px';
            // carts[0].style.left = '78px';
        } else {
            carts[1].classList.add('show1');
            carts[1].style.opacity = 1;
            carts[1].style.visibility = 'visible';
            carts[1].style.top = 'calc(100% / 2 - 5px) !important';
            carts[1].style.left = '78px';
        }
    }
}

// window.addEventListener('load', () => {
    displayCartCounter();
// })

const cart = document.querySelector('.cart-counter');

export const addToCart = () => {

    let cartButtons = document.querySelectorAll('.catalog_item_button');
    let carts = document.querySelectorAll('.cart-counter');

    if (location.href.split('/Pages/')[1].split('/')[0] == 'items') {
        cartButtons = document.querySelector('.item-info_button');
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {

            // displayCartCounter();

            if (!cartCounter) {
                displayCartCounter();
                if (document.documentElement.clientWidth > 1040) {
                    carts[0].classList.add('show');
                } else {
                    carts[1].classList.add('show1');
                }
            } else {
                displayCartCounter();
                if (document.documentElement.clientWidth > 1040) {
                    carts[0].classList.add('show');
                } else {
                    carts[1].classList.add('show1');
                }
            }

            localStorage.setItem(`${cartCounter}`, button.getAttribute('data-id'));
            cartCounter++;
            carts[0].style.opacity = 1;
            carts[0].style.visibility = 'visible';
            carts[1].style.opacity = 1;
            carts[1].style.visibility = 'visible';
            cart.style.opacity = 1;
            cart.style.visibility = 'visible';
            //из notify.js
            if(document.documentElement.clientWidth > 1040) {
                notify.addNotification({
                    type: "success",
                    title: "Готово!",
                    message: "Товар добавлен в корзину!"
                });
            }
        })
    })
}

export const addFromItems = () => {
    let cartButton = document.querySelector('.item-info_button');
    cartButton.addEventListener('click', () => {
        localStorage.setItem(`${cartCounter}`, cartButton.getAttribute('data-id'));
        cartCounter++;
    })
}

export const addFromCollections = () => {
    const collectionButtons = document.querySelectorAll('.catalog_item_button');

    collectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            localStorage.setItem(`${cartCounter}`, button.getAttribute('data-id'));
            cartCounter++;
        })
    })
}

