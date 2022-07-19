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

    // let value = document.querySelector('value')

    // if(value !=){ Si valeur différente de celle qui est dans le local storage
    //     products.splice(2,0) // Voir comment ajouter la quantité choisie par l'utilisateur
    // }

    updateLocalStorage(products)
    location.reload()
}

function removeProduct (id, color) { // Retire le produit du local storage

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