import {convertToDollars} from "./misc"
export default function createNewDonut(inventoryObject){
	let cancelAlert = "Donut creation cancelled";
	let progressDisplay = "";
	let name = "";
	let price = "";
	let initialQuantity = "";
	let key = "";
	name = getNewDonutName(inventoryObject);
	if(name === null){
		alert(cancelAlert);
		return;
	}
	progressDisplay = `New Donut Name: ${name} \n`;
	price = getNewDonutPrice(progressDisplay);
	if(price === null){
		alert(cancelAlert);
		return;
	}
	progressDisplay += `New Donut Price: ${convertToDollars(price)} \n`;
	initialQuantity = getNewDonutQuantity(progressDisplay);
	if(initialQuantity === null){
		alert(cancelAlert);
		return;
	}
	progressDisplay += `New Donut Quantity: ${initialQuantity} \n`;
	key = getNewDonutKey(inventoryObject, progressDisplay);
	if(key === null){
		alert(cancelAlert);
		return;
	}
	progressDisplay += `New Donut Key: ${key} \n`;
	if( confirm(progressDisplay + "Confirm creation of new donut type?") ){
		inventoryObject[key] = new donutData(name, price, initialQuantity);
		alert(`${name} successfully added to shop!`);
		return;
	}
	alert(cancelAlert);
	return;
}

function getNewDonutName(inventoryObject){
	let newDonutName = ""
	let keyArray = Object.keys(inventoryObject);
	let inUse = false;
	while(true){
		newDonutName = prompt("What is the display name for the new donut?", "");
		keyArray.forEach(function(donutEntry){
			if(inventoryObject[donutEntry]["donutName"] === newDonutName){
				inUse = true;
			}
			return;
		})
		if(inUse){
			alert("That name is already in use. Please choose another");
			continue;
		}
		break;
	}
	return newDonutName;
}

function getNewDonutPrice(donutProgress){
	let price = "";
	while(true){
		price = prompt(donutProgress + "What is the price of the new donut?", "");
		if(price === null){
			break;
		}
		price = Number(price);
		if( isNaN(price) || price < 0 ){
			alert("Price must be a positive number");
			continue;
		}
		break;
	}
	return price;
}

function getNewDonutQuantity(donutProgress){
	let quantity = ""
	while(true){
		quantity = prompt(donutProgress + "How many of the new type of donut would you like to add to store inventory?", "");
		if(quantity === null){
			break;
		}
		quantity = Number(quantity);
		if( isNaN(quantity) || quantity < 0 || (Math.floor(quantity) != quantity) ){
			alert("Quantity must be a positive, whole number (Type '0' if you do not want to add donuts)");
			continue;
		}
		break;
	}
	return quantity;
}

function getNewDonutKey(inventoryObject, donutProgress){
	let newKey = ""
	while(true){
		newKey = prompt(donutProgress + "Enter a short, one-word key to easily access the new donut type. \n Key is not case sensitive and cannot already be associated with another donut type", "");
		if(newKey === null){
			break;
		}
		newKey = newKey.toLowerCase();
		if (newKey in inventoryObject){
			let keysInUseMessage = `Sorry, that key is already in use. Please choose a different key. \n All current keys in use are: ${Object.keys(inventoryObject).join(", ")}`
			alert(keysInUseMessage);
			continue;
		}
		break;
	}
	return newKey;
}