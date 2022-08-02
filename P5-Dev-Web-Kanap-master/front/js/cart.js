const listOfProducts = getProductsFromLocalStorage()
let totalofProducts = 0
let totalPrice = 0
console.log(listOfProducts);

let cart__items = document.getElementById("cart__items")

for(let [id,colors] of Object.entries(listOfProducts)){
    console.log(colors);
    fetch("http://localhost:3000/api/products/" + id)
    .then(function(response){
        if(response.ok){
            response.json()
            .then(function(product){
                for(let [color, quantity] of Object.entries(colors)){
                    cart__items.innerHTML += 
                      `<article class="cart__item" data-id="${product._id}" data-color="${color}">
                        <div class="cart__item__img">
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${color}</p>
                            <p>${product.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`

                  let inputsQuantity = document.getElementsByClassName("itemQuantity")
                  
                  Object.values(inputsQuantity).forEach(inputQuantity =>{
                    inputQuantity.addEventListener('change', function(){
                      let article = inputQuantity.closest("article")
                      let elementId = article.getAttribute("data-id")
                      let elementColor = article.getAttribute("data-color")
                      let newQuantity = inputQuantity.value
                      updateQuantity(elementId, elementColor, newQuantity)
                    })
                  })

                    let btnsRemove = document.getElementsByClassName("deleteItem")

                    for(let btnRemove of btnsRemove){
                      btnRemove.addEventListener('click', function(){
                        let article = btnRemove.closest("article")
                        let elementId = article.getAttribute("data-id")
                        let elementColor = article.getAttribute("data-color")
                        removeProduct(elementId, elementColor)
                      });
                    }

                    const totalCartQuantity = document.getElementById("totalQuantity")
                    const totalCartPrice = document.getElementById("totalPrice")

                    totalofProducts += parseInt(quantity)
                    totalPrice += product.price * quantity

                    totalCartQuantity.innerHTML = totalofProducts
                    totalCartPrice.innerHTML = totalPrice

                }
            })

            
        }
    }).catch(function(error){
      console.log("Une erreur est survenue"+error)
    })

}

let email = document.getElementById("email")
let emailErrorMessage = document.getElementById("emailErrorMsg")
let emailRegEx = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/g

let firstName = document.getElementById("firstName")
let firstNameErrorMessage = document.getElementById("firstNameErrorMsg")
let firstNameRegEx = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g

let lastName = document.getElementById("lastName")
let lastNameErrorMessage = document.getElementById("lastNameErrorMsg")
let lastNameRegEx = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g

let address = document.getElementById("address")
let addressErrorMessage = document.getElementById("addressErrorMsg")
let addressRegEx = /^[A-Za-z0-9]/g

let city = document.getElementById("city")
let cityErrorMessage = document.getElementById("cityErrorMsg")
let cityRegEx = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g

let btnOrder = document.getElementById("order")

btnOrder.addEventListener('click', function(event){
  event.preventDefault()
  let formChecker = 0


  if(firstName.value === ""){
    firstName.style.border = "red 2px solid"
    firstNameErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
  } else if(firstName.value.length < 3){
    firstName.style.border = "red 2px solid"
    firstNameErrorMessage.innerHTML = "Ce champ doit au moins comporter 3 caractères"
  } else if(firstName.value.match(firstNameRegEx) === null){
    firstName.style.border = "red 2px solid"
    firstNameErrorMessage.innerHTML = "Ce champ doit être un prénom valide"
  } else {
    formChecker++
    firstName.style.border = "green 2px solid"
    firstNameErrorMessage.innerHTML = ""  
  }

  if(lastName.value === ""){
    lastName.style.border = "red 2px solid"
    lastNameErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
  } else if(lastName.value.length < 3){
    lastName.style.border = "red 2px solid"
    lastNameErrorMessage.innerHTML = "Ce champ doit au moins comporter 3 caractères"
  } else if(lastName.value.match(lastNameRegEx) === null){
    lastName.style.border = "red 2px solid"
    lastNameErrorMessage.innerHTML = "Ce champ doit être un nom valide"
  } else {
    formChecker++
    lastName.style.border = "green 2px solid"
    lastNameErrorMessage.innerHTML = ""  
  }  

  if(address.value === ""){
    address.style.border = "red 2px solid"
    addressErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
  } else if(address.value.length < 3){
    address.style.border = "red 2px solid"
    addressErrorMessage.innerHTML = "Ce champ doit au moins comporter 3 caractères"
  } else if(address.value.match(addressRegEx) === null){
    address.style.border = "red 2px solid"
    addressErrorMessage.innerHTML = "Ce champ doit être une adresse valide"
  } else {
    formChecker++
    address.style.border = "green 2px solid"
    addressErrorMessage.innerHTML = ""  
  }
  
  if(city.value === ""){
    city.style.border = "red 2px solid"
    cityErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
  } else if(city.value.length < 3){
    city.style.border = "red 2px solid"
    cityErrorMessage.innerHTML = "Ce champ doit au moins comporter 3 caractères"
  } else if(city.value.match(cityRegEx) === null){
    city.style.border = "red 2px solid"
    cityErrorMessage.innerHTML = "Ce champ doit être une ville valide"
  } else {
    formChecker++
    city.style.border = "green 2px solid"
    cityErrorMessage.innerHTML = ""  
  }

  if(email.value === ""){
    email.style.border = "red 2px solid"
    emailErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
  } else if(email.value.length < 3){
    email.style.border = "red 2px solid"
    emailErrorMessage.innerHTML = "Ce champ doit au moins comporter 3 caractères"
  } else if(email.value.match(emailRegEx) === null){
    email.style.border = "red 2px solid"
    emailErrorMessage.innerHTML = "Ce champ doit être un email valide"
  } else {
    formChecker++
    email.style.border = "green 2px solid"
    emailErrorMessage.innerHTML = ""  
  }

  if(formChecker < 5){
    event.preventDefault()
    alert("Veuillez vérifier les informations saisies dans le formulaire")
  } else {
    const contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address : address.value,
      city : city.value,
      email : email.value,
    }

    const products = []

    for (let [id] of Object.entries(listOfProducts)) {
      products.push(id)
    }

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({contact, products})
    }).then(function(res){
      res.json()
      .then(function(order){
        alert("Votre commande a été passée avec succès")
        location.replace(`confirmation.html?id=${order.orderId}`)
      })
    }).catch((error)=>{
      console.log(error)
    })

  }
})
