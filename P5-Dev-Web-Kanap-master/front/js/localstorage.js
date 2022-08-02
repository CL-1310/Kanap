const accessLocalStorage = localStorage

function getProductsFromLocalStorage(){
    const products = accessLocalStorage.getItem("kanapProduct")
    if(!products){
        return {}
    }
        return JSON.parse(products)
}

function updateLocalStorage(products){

    accessLocalStorage.setItem("kanapProduct", JSON.stringify(products))
}

function addToCart(id,color,quantity){

    let products = getProductsFromLocalStorage()

    if(products[id]){
        if(products[id][color]) {
            products[id][color] = parseInt(products[id][color]) + parseInt(quantity)
        } else {
            products[id][color] = parseInt(quantity)
        }
    }
    if(!products[id]){
        products[id] = {
            [color] : parseInt(quantity)
        }

    }

    updateLocalStorage(products)

}

function updateQuantity (id, color, quantity) {

    let products = getProductsFromLocalStorage()

    if(products[id][color]){
        products[id][color] = parseInt(quantity)
    }

    updateLocalStorage(products)
    location.reload()
}

function removeProduct (id, color) {

    let products = getProductsFromLocalStorage()

    if(products[id][color]){
        if(Object.keys(products[id]).length > 1){
            delete products[id][color]
        } else {
            delete products[id]
        }
    }

    updateLocalStorage(products)
    location.reload()
}