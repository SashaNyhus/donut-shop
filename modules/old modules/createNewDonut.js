import {convertToDollars} from "./misc.js"
import { postNewDonut } from "./postNewDonut.js";

class newDonutObject {
	type;
	price;
	constructor(type, price){
		this.type = type,
		this.price = price
	}
}

export default function createNewDonut(inventoryArray){
	let cancelAlert = "Donut creation cancelled";
	let progressDisplay = "";
	let name = "";
	let price = "";
	name = getNewDonutName(inventoryArray);
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
	if( window.confirm(progressDisplay + "Confirm creation of new donut type?") ){
		let donutToPost = new newDonutObject(name, price)
		postNewDonut(donutToPost);
		alert(`${name} successfully added to shop!`);
		return;
	}
	alert(cancelAlert);
	return;
}

function getNewDonutName(inventoryArray){
	let newDonutName = ""
	let inUse = false;
	while(true){
		newDonutName = prompt("What is the display name for the new donut?", "");
		inventoryArray.forEach(function(donutEntry){
			if(donutEntry["donutName"] === newDonutName){
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
