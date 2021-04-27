import {API_URL, shopData} from "./main.js"
import {donutData, convertToDollars} from "./donutData.js"

export async function submitOrder(id, body){
    let requestUrl = new URL(`place-order?id=${id}`, API_URL);
    let result = await fetch(requestUrl, {
      "method": "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .catch(err => console.log("problem submitting order: " + err))
    result = await result.json();
    console.log(result)
    return;
}

export async function submitAddition(id, body){
    let requestUrl = new URL(`add-donuts?id=${id}`, API_URL);
    let result = await fetch(requestUrl, {
      "method": "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .catch(err => console.log("problem submitting addition: " + err))
    result = await result.json();
    console.log(result)
    return;
}

export async function submitNewDonut(id, body){
    let requestUrl = new URL(`create-donut-type?id=${id}`, API_URL);
    let result = await fetch(requestUrl, {
      "method": "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .catch(err => console.log("problem submitting new donut: " + err))
    result = await result.json();
    console.log(result)
    return;
}