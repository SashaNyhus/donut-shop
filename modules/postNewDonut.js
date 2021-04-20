export function postNewDonut(newDonut){
    fetch("https://donutshop-api.herokuapp.com/add-donuts?id=424", {
      method: "POST",
      body: JSON.stringify(newDonut)
    })
    .then( res => res.json())
    .then((obj) => console.log(obj))
    .then(() => console.log(JSON.stringify(newDonut)))
    .catch(err => {
        console.error("Donut Type Creation Error:" + err);
      });
  }