import {donutData} from "./donutData.js"
export default function printInventory(inventoryArray) {
  let messageToPrint = [];
  inventoryArray.forEach(function (donutEntry) {
    messageToPrint.push(
      donutEntry.createInventoryDisplay()
    );
  });
  alert(messageToPrint.join("\n"));
  return;
}
