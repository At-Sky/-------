const cards = document.querySelectorAll('.card')

export async function getProds() {
    return await fetch('https://fakestoreapi.com/products?limit=4')
    .then(res => res.json())
    .then(json => json)
}

async function setProds() {
    let prods = await getProds()

    function card(prod, childs) {
        if (prod.description.length > 150) {
            prod.description = prod.description.substring(0,150) + '...'
        }

        childs[0].src = prod.image
        childs[1].innerText = prod.title
        childs[2].innerText = '$ ' + prod.price
        childs[3].innerText = prod.description
    }
                        
    cards.forEach((item, index) => card(prods[index], item.children))
}

setProds()