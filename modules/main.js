import { submitOrder, submitAddition } from "./changeShopData.js";
import {getShopsList, getShopID, getShopInventory, getShopRevenue} from "./getShopData.js"

export const API_URL = new URL("https://donutshop-api.herokuapp.com");
const CUSTOMER_REVIEWS = ["Delicious", "Unique", "Unforgettable", "The best donut money can buy", "Classic", "So tasty!", "Distinctive", "Just heavenly", "A charming addition to the shop", "Exquisite", "I'm Commander Shepherd, and this is my favorite donut in the Citadel"]
export var shopData = {}

initializeShopsOptions();

//shop selection
document.getElementById("daily-donut-shortcut").addEventListener("click", (() => gotToShop("The Daily Donut")));
document.getElementById("go-to-shop").addEventListener("click", () => gotToShop(document.getElementById("shop-choice").value).catch(err => console.log("error accessing shop data: " + err)));
document.getElementById("suggest-shop").addEventListener("click", suggestRandomShop);

//shop buttons
document.getElementById("show-inventory").addEventListener("click", refreshInventory);
document.getElementById("show-revenue").addEventListener("click", displayRevenue);
document.getElementById("order-donuts").addEventListener("click", displayOrderForm);
document.getElementById("add-donuts").addEventListener("click", displayAddForm);
document.getElementById("back-button").addEventListener("click", leaveSubMenu);

//submit buttons
document.getElementById("place-order").addEventListener("click", orderDonuts);
document.getElementById("submit-addition").addEventListener("click", addDonuts);

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
  leaveSubMenu();
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
  document.getElementById("display-area").style.display="flex";
  console.log("Inventory updated")
  return;
}

async function displayRevenue(){
  loadingScreen(true, "Accessing Shop Data");
  let shopRevenue = await getShopRevenue(shopData.id)
  .catch(err => console.log("error fetching shop inventory: " + err))
  document.getElementById("display-area").innerText = `This shop has earned a total of ${shopRevenue}.`;
  document.getElementById("display-area").style.display="flex";
  leaveShopMenu();
  loadingScreen(false, "");
}

function displayOrderForm(){
  leaveShopMenu();
  displayRadioButtons();
  document.getElementById("order-form").style.display="flex";
  document.getElementById("place-order").style.display="inline";
  document.getElementById("submit-addition").style.display="none";
}

function displayAddForm(){
  leaveShopMenu();
  displayRadioButtons();
  document.getElementById("order-form").style.display="flex";
  document.getElementById("place-order").style.display="none";
  document.getElementById("submit-addition").style.display="inline";
}

function displayRadioButtons(){
  let htmlToDisplay = [];
  shopData.inventory.forEach(function (donutEntry, index){
    htmlToDisplay.push(donutEntry.createRadioButton(index))
  })
  let radioButtons = document.getElementById("radio-buttons");
  radioButtons.innerHTML=(htmlToDisplay.join("\n"));
}

async function orderDonuts(){
  let newOrder = getDonutChoice(true);
  if (newOrder === "cancelled"){
    return;
  }
  loadingScreen(true, "Submitting Order");
  await submitOrder(shopData.id, newOrder);
  leaveSubMenu();
  loadingScreen(false, "");
  return;
}

async function addDonuts(){
  let donutsToAdd = getDonutChoice(false);
  if(donutsToAdd === "cancelled"){
    return;
  }
  loadingScreen(true, "Adding Donuts");
  await submitAddition(shopData.id, donutsToAdd);
  leaveSubMenu();
  loadingScreen(false, "");
  return;
}

function getDonutChoice(purchase){
  let choice = "nothing";
  let quantity = 1;
  let radioButtons = document.getElementsByName("donut-choice");
  for (let button of radioButtons){
    if(button.checked){
      choice = button.value
    }
  }
  if(choice === "nothing"){
    alert("You must select a donut type");
    return "cancelled";
  }
  choice = shopData.inventory[choice];
  console.log(choice);
  quantity = Number(document.getElementById("donut-quantity").value);
  if(purchase && (quantity > choice.donutQuantityInStore)){
    alert("Not enough donuts in the store to place that order");
    return "cancelled";
  }
  return {type: choice.donutName, count: quantity};
}

function leaveShopMenu(){
  document.getElementById("shop-buttons").style.display="none";
  document.getElementById("back-button").style.display="flex";
}

function leaveSubMenu(){
  let subMenu = document.getElementsByClassName("sub-menu")
  for(let element of subMenu){
  element.style.display="none"
  }
  document.getElementById("shop-buttons").style.display="flex";
}


function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}