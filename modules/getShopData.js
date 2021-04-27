import {API_URL, shopData} from "./main.js"
import {donutData, convertToDollars} from "./donutData.js"

export async function getShopsList(){
    let requestUrl = new URL("shops", API_URL);
    let fetchedShops = await fetch(requestUrl, {
        "method": "GET"
    })
    fetchedShops = await fetchedShops.json();
    return fetchedShops;

}
export async function getShopID(shopName){
    let requestUrl = new URL("shop-id", API_URL);
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
    console.log("shop id fetched as " + fetchedID);
    return fetchedID;
  }

  export async function getShopInventory(id){
      let requestUrl = new URL(`inventory?id=${id}`, API_URL);
      let fetchedInventory = await fetch(requestUrl, {"method": "GET"});
      fetchedInventory = await fetchedInventory.json();
      shopData.inventory = initialize(fetchedInventory);
      console.log("successfully downloaded inventory for " + shopData.name)
  }

  export async function getShopRevenue(id){
    let requestUrl = new URL(`revenue?id=${id}`, API_URL);
    let fetchedRevenue = await fetch(requestUrl, {"method": "GET"});
    fetchedRevenue = await fetchedRevenue.json();
    console.log("successfully downloaded revenue for " + shopData.name)
    return convertToDollars(fetchedRevenue.revenue);
  }

  function initialize(fetchedData){
    let processedInventory = []
    fetchedData.donuts.forEach(donutEntry => processedInventory.push(new donutData(donutEntry.type, donutEntry.price, donutEntry.count)));
    return processedInventory;
  }