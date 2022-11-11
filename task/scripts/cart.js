import { getProds } from "../scripts/fakestore.js";

const addButtons = document.querySelectorAll('.card__button')
const cartContainer = document.querySelector('.products-list')
const buyButton = document.querySelector('.cart__buy-button')

let cart = []

addButtons.forEach((button, index) => {
    button.addEventListener('click', () => addProd(index + 1))
})

async function addProd(id) {
    let prods = await getProds()
    
    prods.forEach(item => {
        if (item.id == id) {
            cart.push(item)
        }
    })

    updateCart(cart)
}

updateCart(cart) //первый вызов для пустой корзины

function updateCart(cart) { 
    // cart.map(item => {
    //     item.amount = 1
    // })

    let result = cart.reduce((acc, n) => (acc[n.id] = (acc[n.id] || 0) + 1, acc), {});

    let container = '';

    if (cart.length > 0) {
        for (let key in result) {
            let product = cart.find(item => item.id == key ? true : false)

            if (product) {
                let prod = `
                    <div class="products-list__item product">
                        <img src="${product.image}" alt="" class="prod__image">
                        <h1 class="prod__title">${product.title}</h1>
                        <span class="prod__price">$ ${product.price}</span>
                        <span class="prod__summary">$ ${product.price * result[key]}</span>
                        <div class="product__buttons-container">
                            <button class="product__minus" data-id="${product.id}">-</button>
                            <span class="product__counter">${result[key]}</span>
                            <button class="product__plus" data-id="${product.id}">+</button>
                        </div>
                    </div>
                `;

                container += prod;
            }
        }

        cartContainer.innerHTML = container
        buyButton.classList.add('active')
        addEvents()
    } else {
        cartContainer.innerHTML = '<p class="cart__empty">Добавьте товар</p>'
    }
}

function addEvents() {
    const minButtons = document.querySelectorAll('.product__minus')
    const plusButtons = document.querySelectorAll('.product__plus')

    minButtons.forEach(button => {
        button.addEventListener('click', event => decreaseProd(event.target))
    })
    
    plusButtons.forEach(button => {
        button.addEventListener('click', event => increaseProd(event.target))
    })
}


function increaseProd(target) {
    let prodId = target.attributes[1].value

    let prod = cart.find(item => item.id == prodId ? true : false)

    console.log(cart)

    cart.push(prod)
    updateCart(cart)
}

function decreaseProd(target) {
    let prodId = target.attributes[1].value
    let prodIndex = cart.indexOf(cart.find((item, index) => item.id == prodId ? true : false))

    cart.splice(prodIndex, 1)

    updateCart(cart)
}