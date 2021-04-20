export function postAddition(addition){
    fetch("https://donutshop-api.herokuapp.com/add-donuts?id=424", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addition)
    })
    .then( res => res.json())
    .then((obj) => console.log(obj))
    .then(() => console.log(JSON.stringify(addition)))
    .catch(err => {
        console.error("Donut Addition Error:" + err);
      });
  }