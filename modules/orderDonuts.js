import {getDonutChoice, getDonutQuantity} from "./getDonutChoices";
import {recordOrder} from "./inventory";
export default function orderDonuts(inventoryObject){
	let donutToBuy = getDonutChoice(inventoryObject, true);
	if (donutToBuy === null){
		alert("Order cancelled");
		return;
	}
	let orderQuantity = getDonutQuantity(donutToBuy, true);
	if (orderQuantity === 0){
		alert("Order cancelled");
		return;
	}
	let orderPrice = getOrderPrice(donutToBuy, orderQuantity);
	let orderConfirmed = confirmOrder(donutToBuy, orderQuantity, orderPrice);
	if(orderConfirmed) {
		recordOrder(donutToBuy, orderQuantity, orderPrice);
		alert("Thank you for your purchase!");
	}
	else{
		alert("Order cancelled")
	}
	return;
}

export function getOrderPrice(donutObject, quantity){
	return (donutObject["donutPrice"] * quantity);
}

function confirmOrder(donutObject, quantity, price){
	let confirmationMessage = `Confirm order of ${quantity} ${donutObject["donutName"]}(s) for ${convertToDollars(price)}?`
	return confirm(confirmationMessage);
}