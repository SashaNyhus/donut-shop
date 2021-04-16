import {convertToDollars} from "./misc.js"
export function getDonutChoice(inventoryObject, purcahse){
	let donutChoice;
	let keyArray = Object.keys(inventoryObject);
	let optionsDisplay = [`Enter the item key for the donut you wish to ${purcahse ? "purchase": "add"} (listed in parentheses)`];
	keyArray.forEach( function(donutEntry){
		optionsDisplay.push(`(${donutEntry}) ${inventoryObject[donutEntry]["donutName"]}, ${convertToDollars(inventoryObject[donutEntry]["donutPrice"])} each`)
	});
	optionsDisplay = optionsDisplay.join("\n");
	while(true){
		donutChoice = (prompt(optionsDisplay, "").toLowerCase());
		if (donutChoice in inventoryObject){
			break;
		}
		else if (donutChoice === null){
			break;
		}
		else {
			alert("Key not recognized. Try again or cancel order.");
			continue;
		}
	}
	donutChoice = inventoryObject[donutChoice];
	return donutChoice;
}

export function getDonutQuantity(donutObject, purchase){
	let quantity = 0;
	while(true){
		quantity = Number( prompt(`Enter the quantity of ${donutObject["donutName"]}s you would like to ${purchase ? "purchase": "add to inventory"}`, "") );
		if (isNaN(quantity) || (quantity < 0) || (Math.floor(quantity) !== quantity)){
			alert("Please enter a positive, whole number");
			continue;
		}
		else if (purchase && donutObject["donutQuantityInStore"] < quantity){
			quantity = donutObject["donutQuantityInStore"];
			alert(`Sorry, we only have ${quantity} ${donutObject["donutName"]}(s) in the store. Your order has been changed to ${quantity} donuts.`)
		}
		break;
	}
	return quantity;
}