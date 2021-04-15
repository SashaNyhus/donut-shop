import {getOrderPrice} from "./orderDonuts";
import {recordOrder} from "./inventory";
export default function recordRandomOrders(revenueTotal, inventoryObject){
	let keyArray = Object.keys(inventoryObject);
	let ordersToGenerate = Number( prompt("How many random orders would you like to generate?", "") );
	if(isNaN(ordersToGenerate)){
		alert("Not a number; action cancelled");
		return;
	}
	for(let i = 0; i < ordersToGenerate; i++){
		let donutChoice = inventoryObject[keyArray[getRandomNumber(0, (keyArray.length - 1))]];
		let donutQuantity = getRandomNumber(1, (donutChoice["donutQuantityInStore"]));
		let orderPrice = getOrderPrice(donutChoice, donutQuantity);
		recordOrder(donutChoice, donutQuantity, orderPrice);
	}
	alert(`${ordersToGenerate} order(s) recorded`)
	return;
}

function getRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}