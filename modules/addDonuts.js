import {getDonutChoice, getDonutQuantity} from "./getDonutChoices";
import {recordDonutAddition} from "./inventory";
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
	let additionConfirmed = confirm(`${quantityToAdd} ${donutToAdd["donutName"]}(s) will be added to shop inventory`);
	if(additionConfirmed){
		recordDonutAddition(donutToAdd, quantityToAdd);
	}
	return;
}