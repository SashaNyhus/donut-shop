import {convertToDollars} from "./misc";
export default function printInventory(inventoryObject) {
  let messageToPrint = [];
  let keyArray = Object.keys(inventoryObject);
  keyArray.forEach(function (donutEntry) {
    messageToPrint.push(
      inventoryObject[donutEntry]["donutName"] +
        ": " +
        inventoryObject[donutEntry]["donutQuantityInStore"] +
        " in inventory, priced at " +
        convertToDollars(inventoryObject[donutEntry]["donutPrice"]) +
        " each."
    );
  });
  alert(messageToPrint.join("\n"));
  return;
}
