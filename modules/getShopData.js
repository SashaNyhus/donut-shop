import {API_URL, shopData} from "./main.js"
import {donutData} from "./donutData.js"
export async function getShopID(shopName){
    let requestUrl = new URL("shop-id", API_URL);
    console.log(requestUrl)
    let body = {name: shopName}
    let fetchedID = await fetch(requestUrl, {
      "method": "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    fetchedID = await fetchedID.json();
    fetchedID = fetchedID.id;
    return fetchedID;
  }

  export async function getShopInventory(id){
      let requestUrl = new URL(`inventory?id=${id}`, API_URL);
      console.log(id)
      let fetchedInventory = await fetch(requestUrl, {"method": "GET"});
      fetchedInventory = await fetchedInventory.json();
      shopData.inventory = initialize(fetchedInventory);
  }

  function initialize(fetchedData){
    let processedInventory = []
    fetchedData.donuts.forEach(donutEntry => processedInventory.push(new donutData(donutEntry.type, donutEntry.price, donutEntry.count)));
    return processedInventory;
  }