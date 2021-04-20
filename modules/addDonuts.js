import {getDonutChoice, getDonutQuantity} from "./getDonutChoices.js";
import {postAddition} from "./postAddition.js"

class donutAddition {
	type;
	count;
	constructor(type, count){
		this.type = type,
		this.count = count
	}
}

export default function addDonuts(inventoryObject){
	let donutToAdd = getDonutChoice(inventoryObject, false);
	if(donutToAdd === null){
		alert("Action cancelled");
		return;
	}
	let quantityToAdd = getDonutQuantity(donutToAdd, false);
	if(quantityToAdd === 0 || quantityToAdd === null){
		alert("Action cancelled")
		return;
	}
	let additionConfirmed = window.confirm(`${quantityToAdd} ${donutToAdd["donutName"]}(s) will be added to shop inventory`);
	if(additionConfirmed){
		let additionObject = new donutAddition(donutToAdd["donutName"], quantityToAdd)
		postAddition(additionObject);
	}
	return;
}