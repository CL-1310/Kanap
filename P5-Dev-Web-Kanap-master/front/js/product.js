let url = new URL(location)
console.log(url);

let urlParams = (url).searchParams

let productID = urlParams.get("id")
console.log(productID)


fetch("http://localhost:3000/api/products/"+ productID)
.then(function(response){
    if(response.ok){
        response.json()
        .then(function(item){
            console.log(item)
            let item__img = document.getElementsByClassName("item__img")[0]
            let img = document.createElement("img")
            img.src = item.imageUrl
            img.alt = item.altTxt
            item__img.appendChild(img)


            let title = document.getElementById("title") 
            title.innerHTML = item.name


            let price = document.getElementById("price") 
            price.innerHTML = item.price


            let description = document.getElementById("description") 
            description.innerHTML = item.description


            let colors = document.getElementById("colors")
            for (let color of item.colors){
                console.log(color);
                let option = document.createElement("option")
                option.value = color
                option.innerHTML = color
                colors.appendChild(option)
            }

            let btnAddToCart = document.getElementById("addToCart")

            btnAddToCart.addEventListener('click', function(event){

                let inputQuantity = document.getElementById("quantity")

                let inputColor = document.getElementById("colors")

                if(inputQuantity.value >= 1 && inputQuantity.value <= 100) {
                    console.log(inputColor.value);

                    if(inputColor.value !== "") {
                        addToCart(productID, inputColor.value, inputQuantity.value)
                        alert("Votre produit a bien été ajouté")
                    }
                }
                

            })

        })   
    }
}).catch(function(error){
    console.log("Une erreur est survenue"+error)
})