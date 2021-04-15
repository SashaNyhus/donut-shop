import {shopTotalSold} from "./inventory"
export default function printRevenue(revenueTotal, inventoryObject){
	let messageToPrint = [`Total shop revenue is ${convertToDollars(revenueTotal)}, from ${ shopTotalSold} donut(s) sold`];
	let keyArray = Object.keys(inventoryObject);
	keyArray.forEach( function(donutEntry){
		messageToPrint.push(`${convertToDollars(inventoryObject[donutEntry]["donutIndividualRevenue"])} from ${inventoryObject[donutEntry]["donutQuantitySold"]} ${inventoryObject[donutEntry]["donutName"]}(s) sold`)
	});
	alert(messageToPrint.join("\n"))
	return;
}
