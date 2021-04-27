import {shopData, loadingScreen, leaveSubMenu} from "./main.js"
import {submitNewDonut} from "./changeShopData.js"

export async function createNewDonut(){
    let newDonutName = document.getElementById("new-donut-name").value;
    for (let donutEntry of shopData.inventory){
        if(donutEntry.donutName === newDonutName){
            alert("That name is already in use at this store");
            return;
        }
    }
    if(!(newDonutName)){
        alert("Enter a name for the new donut");
        return;
    }
    let newDonutPrice = Number(document.getElementById("new-donut-price").value);
    let newDonutObject = {type: newDonutName, price: newDonutPrice};
    loadingScreen(true, "Creating New Donut");
    await submitNewDonut(shopData.id, newDonutObject);
    leaveSubMenu();
    loadingScreen(false, "");
    return;
}