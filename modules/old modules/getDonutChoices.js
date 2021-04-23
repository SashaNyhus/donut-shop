import { getNumberInput } from "./checkInput.js";

export function getDonutChoice(inventoryArray, purchase){
	let donutChoice;
	let optionsDisplay = [`Enter the item key for the donut you wish to ${purchase ? "purchase": "add"} (listed in parentheses)`];
	inventoryArray.forEach( function(donutEntry, index){
		optionsDisplay.push(donutEntry.createOptionDisplay(index))
	});
	optionsDisplay = optionsDisplay.join("\n");
	donutChoice = getNumberInput(optionsDisplay, 0, (inventoryArray.length - 1));
	if (donutChoice === null){
		return donutChoice;
	}
	console.log(donutChoice);
	donutChoice = inventoryArray[donutChoice];
	return donutChoice;
}

export function getDonutQuantity(donutObject, purchase){
	let quantity = 0;
	let maxQuantity = 999;
	let display = `Enter the quantity of ${donutObject["donutName"]}s you would like to ${purchase ? "purchase": "add to inventory"}`;
	if (purchase){
		display += `\n We currently have ${donutObject["donutQuantityInStore"]} in inventory.`
		maxQuantity = donutObject["donutQuantityInStore"]
	}
	quantity = getNumberInput(display, 0, maxQuantity);
	return quantity;
}