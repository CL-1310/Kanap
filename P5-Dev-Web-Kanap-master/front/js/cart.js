const listOfProducts = getProductsFromLocalStorage()
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



                    // const input = document.querySelector('input');
                    // const value = document.querySelector('value');

                    // for(let [quantity] of Object.entries(quantity)){
                    //   input.addEventListener('change', updateValue);
                    //   function updateValue(event) {
                    //     value.innerText = e.target.value;
                    //   }
                    // }

                    let btnsRemove = document.getElementsByClassName("deleteItem")
                    // console.log(btnsRemove)

                    for(let btnRemove of btnsRemove){
                      // console.log(color)
                      btnRemove.addEventListener('click', function(){
                        let article = btnRemove.closest("article")
                        let elementId = article.getAttribute("data-id")
                        let elementColor = article.getAttribute("data-color")
                        removeProduct(elementId, elementColor)
                      });
                    }
                    //Ajouter quantité totale + prix total
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
let btnOrder = document.getElementById("order")

btnOrder.addEventListener('click', function(event){
  event.preventDefault()
  let formChecker = 0

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
//Suite des vérifs formulaire

// /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g => pour les noms
// /^[A-Za-z0-9]/g => pour les adresses

//Pour la ville, utiliser la regEx des noms



  if(formChecker < 5){
    event.preventDefault()
    alert("Veuillez vérifier les informations saisies dans le formulaire")
  } else {
    //Récupérer les infos et envoyer la commande
    const contact = {
      firstName: firstName.value,
      // lastName
      // address
      // city
      // email
    }
    // Créer un tableau vide (const productToBuy = [])
    //Créer une boucle sur la liste des produits récupérés au début du script (getproductfromlocalstorage) | utiliser push pour insérer les IDs
    //Infos du form à envoyer en fetch avec la méthode POST au bon format
  }
})
            
            // function(checkEmail){
            //   ^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$
            // }

            // if(checkEmail === true) {
            //   console.log("Mail OK")
            // } else {
            //   console.log("Mail incorrect"+error)
            // }

