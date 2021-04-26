import {getShopsList, getShopID, getShopInventory} from "./getShopData.js"

export const API_URL = new URL("https://donutshop-api.herokuapp.com");
const MAIN_MENU_TEXT = `What would you like to do?
(1) Print current donut inventory and prices
(2) Print current donut sales and total revenue
(3) Create new donut type
(4) Add donuts to inventory
(5) Order donuts
(6) Generate random orders 
(7) Quit program`;
export var shopData = {}

initializeShopsOptions();
console.log(document.getElementById("shop-choice").textContent)
document.getElementById("daily-donut-shortcut").addEventListener("click", (() => gotToShop("The Daily Donut")));
document.getElementById("inventory-refresh").addEventListener("click", refreshInventory);
document.getElementById("go-to-shop").addEventListener("click", () => gotToShop(document.getElementById("shop-choice").value).catch(err => console.log("error accessing shop data: " + err)));

async function initializeShopsOptions(){
  loadingScreen(true, "Loading Donut Shop Options");
  let shopsArray = await getShopsList()
  .catch(error => console.log("Error fetching shops list: " + error))
  shopsArray.forEach(shopName => createOption(shopName));
  loadingScreen(false, "");
  return;
}

function createOption(shop){
  if(shop.includes(`'`)){
    return;
  }
  let option = document.createElement("option");
  option.value = shop;
  document.getElementById("shops").append(option);
  return;
}

function loadingScreen(loading, reason){
  document.getElementById("loading-text").innerText=reason;
  let loadingDisplay = document.getElementById("loading-screen");
  if(loading){
    loadingDisplay.style.visibility="visible"
  }
  else {
    loadingDisplay.style.visibility="hidden"
  }
}
//436
async function gotToShop(shop){
  console.log("loading " + shop)
  loadingScreen(true, "Accessing Shop Data");
  setShopName(shop);
  let shopID = await getShopID(shop);
  setShopID(shopID);
  await getShopInventory(shopID);
  displayInventory();
  document.getElementById("shop-name-display").innerText=shop;
  document.getElementById("order-form").style.visibility="visible";
  loadingScreen(false, "");
  return;
}

function setShopName(name){
  shopData.name = name;
  return;
}
function setShopID(id){
  shopData.id = id;
  return;
}

async function refreshInventory(){
  loadingScreen(true, "Accessing Shop Data");
  await getShopInventory(shopData.id)
  .catch(err => console.log("error fetching shop inventory: " + err))
  displayInventory();
  loadingScreen(false, "");
  return;
}

function displayInventory(){
  let messageToPrint = [];
  shopData.inventory.forEach(function (donutEntry) {
    messageToPrint.push(
      donutEntry.createInventoryDisplay()
    );
  });
  console.log(messageToPrint)
  document.getElementById("display-area").innerHTML=(messageToPrint.join("\n"));
  return;
}

function printSuggestions(){
  let shops = []
  fetch("https://donutshop-api.herokuapp.com/shops", {
    "method": "GET"
  })
  .then(result => result.json())
  // .then(fetchedArray => (shops = fetchedArray))
  .then(shopArray => AddShopIDs(shopArray))
  .then(() => document.getElementById("display-area").innerHTML = shops.join("\n"))
  
}


function AddShopIDs(arr){
  arr.map(element => {
    getShopID(element)
    .then(result => ({name: element, id: result}))
  });
}