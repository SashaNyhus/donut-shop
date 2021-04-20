//CURRENTLY NOT IN USE, fetchInventory moved to main.js until I know what I'm doing with promises enough to move it back to a module

// import { donutData } from "./donutData";
import {mainMenu, shopInventory} from "./main.js"
class donutData {
  donutName;
  donutPrice;
  donutQuantityInStore;

  constructor(name, price, quantity) {
    this.donutName = name;
    this.donutPrice = price;
    this.donutQuantityInStore = quantity;
  }
  createOptionDisplay(key){
    return `(${key}) ${this.donutName}, ${convertToDollars(this.donutPrice)} each, ${this.donutQuantityInStore} in inventory.`
  }
}

export default function fetchStoreInventory(){
  fetch("https://donutshop-api.herokuapp.com/inventory?id=424", {
    "method": "GET"
  })
    .then(response => response.json())
    .then(fetchedInventory => initialize(fetchedInventory))
    .then(finalInventory => (shopInventory = finalInventory))
    .then(mainMenu())
    .catch(err => {
      console.error("Store Inventory Fetch Error:" + err);
    });
}

function initialize(fetchedData){
  let processedInventory = []
  fetchedData.donuts.forEach(donutEntry => processedInventory.push(new donutData(donutEntry.name, donutEntry.price, donutEntry.count)));
  return processedInventory;
}