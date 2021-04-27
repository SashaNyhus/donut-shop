import {getShopsList, getShopID, getShopInventory} from "./getShopData.js"

export const API_URL = new URL("https://donutshop-api.herokuapp.com");
const CUSTOMER_REVIEWS = ["Delicious", "Unique", "Unforgettable", "The best donut money can buy", "Classic", "So tasty!", "Distinctive", "Just heavenly", "A charming addition to the shop", "Exquisite", "I'm Commander Shepherd, \n and this is my favorite donut in the Citadel"]
export var shopData = {}

initializeShopsOptions();

//shop selection
document.getElementById("daily-donut-shortcut").addEventListener("click", (() => gotToShop("The Daily Donut")));
document.getElementById("inventory-refresh").addEventListener("click", refreshInventory);
document.getElementById("go-to-shop").addEventListener("click", () => gotToShop(document.getElementById("shop-choice").value).catch(err => console.log("error accessing shop data: " + err)));
document.getElementById("suggest-shop").addEventListener("click", suggestRandomShop)

//shop buttons
document.getElementById("show-inventory").addEventListener("click", refreshInventory);

document.getElementById("back-button").addEventListener("click", leaveSubMenu);

async function initializeShopsOptions(){
  loadingScreen(true, "Loading Donut Shop Options");
  let shopsArray = await getShopsList()
  .catch(error => console.log("Error fetching shops list: " + error));
  shopsArray.forEach(shopName => createOption(shopName));
  loadingScreen(false, "");
  return;
}

function suggestRandomShop(){
  let optionsArray = document.getElementsByClassName("shop-option");
  let index = getRandomNumber(0, (optionsArray.length - 1));
  let randomShop = optionsArray[index].value;
  document.getElementById("shop-choice").value = randomShop;
}

function createOption(shop){
  if(shop.includes(`'`) || shop.includes(`[`)){
    return;
  }
  let option = document.createElement("option");
  option.value = shop;
  option.classList.add("shop-option");
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

async function gotToShop(shop){
  console.log("loading " + shop)
  loadingScreen(true, "Accessing Shop Data");
  setShopName(shop);
  let shopID = await getShopID(shop);
  setShopID(shopID);
  await getShopInventory(shopID);
  document.getElementById("shop-name-display").innerText=shop;
  document.getElementById("shop-buttons").style.display="flex";
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
    let index = getRandomNumber(0, (CUSTOMER_REVIEWS.length - 1) );
    let review = CUSTOMER_REVIEWS[index];
    messageToPrint.push(
      donutEntry.createInventoryDisplay(review)
    );
  });
  leaveShopMenu();
  document.getElementById("display-area").innerHTML=(messageToPrint.join("\n"));
  document.getElementById("display-area").style.visibility="visible";
  console.log("Inventory updated")
  return;
}

function leaveShopMenu(){
  document.getElementById("shop-buttons").style.display="none";
  document.getElementById("back-button").style.visibility="visible";
}

function leaveSubMenu(){
  let subMenu = document.getElementsByClassName("sub-menu")
  for(let element of subMenu){
  element.style.visibility="hidden"
  }
  document.getElementById("shop-buttons").style.display="flex";
}

function AddShopIDs(arr){
  arr.map(element => {
    getShopID(element)
    .then(result => ({name: element, id: result}))
  });
}

function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}