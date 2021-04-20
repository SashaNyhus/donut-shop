export function postOrder(order){
    fetch("https://donutshop-api.herokuapp.com/place-order?id=424", {
      method: "POST",
      body: JSON.stringify(order)
    })
    .then( res => res.json())
    .then((obj) => console.log(obj))
    .then(() => console.log(JSON.stringify(order)))
    .catch(err => {
        console.error("Order Post Error:" + err);
      });
  }