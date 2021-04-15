import { shopRevenue, shopInventory } from "./inventory";
import printInventory from "./printInventory";
import printRevenue from "./printRevenue";
import createNewDonut from "./createNewDonut";

const MAIN_MENU = `Welcome to Marion's Donut Shop!
What would you like to do?
(1) Print current donut inventory and prices
(2) Print current donut sales and total revenue
(3) Create new donut type
(4) Add donuts to inventory
(5) Order donuts
(6) Generate random orders 
(7) Quit program`;

mainMenu();

function mainMenu() {
  menuLoop: while (true) {
    let input = prompt(MAIN_MENU, "");
    switch (input) {
      case "1":
        printInventory(shopInventory);
        break;
      case "2":
        printRevenue(shopRevenue, shopInventory);
        break;
      case "3":
        createNewDonut(shopInventory);
        break;
      case "4":
        addDonuts(shopInventory);
        break;
      case "5":
        orderDonuts(shopInventory);
        break;
      case "6":
        recordRandomOrders(shopRevenue, shopInventory);
        break;
      case "7":
      case null:
        break menuLoop;
      default:
        alert("Please enter a number from 1-7");
        break;
    }
  }
}
