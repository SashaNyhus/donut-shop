import {getDonutChoice, getDonutQuantity} from "./getDonutChoices.js";
import {postOrder} from "./postOrder.js";
import {convertToDollars} from "./misc.js";
class order {
	type;
	count;
	constructor(type, count){
		this.type = type;
		this.count = count;
	}
}

export default function orderDonuts(inventoryObject){
	let donutToBuy = getDonutChoice(inventoryObject, true);
	if (donutToBuy === null){
		alert("Order cancelled");
		return;
	}
	let orderQuantity = getDonutQuantity(donutToBuy, true);
	if (orderQuantity === 0 || orderQuantity === null){
		alert("Order cancelled");
		return;
	}
	let orderPrice = getOrderPrice(donutToBuy, orderQuantity);
	let orderConfirmed = confirmOrder(donutToBuy, orderQuantity, orderPrice);
	if(orderConfirmed) {
		let orderToPost = new order(donutToBuy["donutName"], orderQuantity);
		postOrder(orderToPost);
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
	return window.confirm(confirmationMessage);
}