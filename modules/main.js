// import { shopRevenue, shopInventory } from "./inventory.js";
import printInventory from "./printInventory.js";
import printRevenue from "./printRevenue.js";
import createNewDonut from "./createNewDonut.js";
import addDonuts from "./addDonuts.js";
import orderDonuts from "./orderDonuts.js";
import recordRandomOrders from "./randomOrder.js";
import {donutData} from "./donutData.js"

const MAIN_MENU_TEXT = `What would you like to do?
(1) Print current donut inventory and prices
(2) Print current donut sales and total revenue
(3) Create new donut type
(4) Add donuts to inventory
(5) Order donuts
(6) Generate random orders 
(7) Quit program`;
var shopInventory = {}

fetchStoreInventory()


function fetchStoreInventory(){
  fetch("https://donutshop-api.herokuapp.com/inventory?id=424", {
    "method": "GET"
  })
    .then(response => response.json())
    .then(fetchedInventory => initialize(fetchedInventory))
    .then(finalInventory => (shopInventory = finalInventory))
    .then(() => (mainMenu()))
    .catch(err => {
      console.error("Store Inventory Fetch Error:" + err);
    })
    
}

function initialize(fetchedData){
  let processedInventory = []
  fetchedData.donuts.forEach(donutEntry => processedInventory.push(new donutData(donutEntry.type, donutEntry.price, donutEntry.count)));
  return processedInventory;
}

function mainMenu() {
  menuLoop: while (true) {
    let input = prompt(MAIN_MENU_TEXT, "");
    switch (input) {
      case "1":
        printInventory(shopInventory);
        break;
      case "2":
        printRevenue(shopRevenue, shopInventory);
        break;
      case "3":
        createNewDonut(shopInventory);
        break;
      case "4":
        addDonuts(shopInventory);
        break;
      case "5":
        orderDonuts(shopInventory);
        break;
      case "6":
        recordRandomOrders(shopRevenue, shopInventory);
        break;
      case "7":
      case null:
        break menuLoop;
      default:
        alert("Please enter a number from 1-7");
        break;
    }
  }
}

// new Promise((resolve, reject) => {
//   fetchStoreInventory()
// })
//   .then(response => (alert("Fetch completed for " + response)))
//   // .then(console.log())
//   .then(mainMenu())


