import {getDonutChoice, getDonutQuantity} from "./getDonutChoices.js";
import {recordDonutAddition} from "./inventory.js";
export default function addDonuts(inventoryObject){
	let donutToAdd = getDonutChoice(inventoryObject, false);
	if(donutToAdd === null){
		alert("Action cancelled");
		return;
	}
	let quantityToAdd = getDonutQuantity(donutToAdd, false);
	if(quantityToAdd === 0){
		alert("Action cancelled")
		return;
	}
	let additionConfirmed = window.confirm(`${quantityToAdd} ${donutToAdd["donutName"]}(s) will be added to shop inventory`);
	if(additionConfirmed){
		recordDonutAddition(donutToAdd, quantityToAdd);
	}
	return;
}