let url = new URL(location)
console.log(url);

let urlParams = (url).searchParams

let orderID = urlParams.get("id")
console.log(orderID)

let spanOrderId = document.getElementById("orderId")

spanOrderId.innerHTML = orderID

accessLocalStorage.clear()