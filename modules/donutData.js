export class donutData {
    donutName;
    donutPrice;
    donutQuantityInStore;
  
    constructor(name, price, quantity) {
      this.donutName = name;
      this.donutPrice = price;
      this.donutQuantityInStore = quantity;
    }
    createOptionDisplay(key){
      return `(${key}) ${this.donutName}, ${convertToDollars(this.donutPrice)} each, ${this.donutQuantityInStore} in inventory.`
    }
    createInventoryDisplay(){
        return `${this.donutName}, ${convertToDollars(this.donutPrice)} each, ${this.donutQuantityInStore} in inventory.`;
    }
  }



  export function convertToDollars(x){
    return "$" + Number.parseFloat(x).toFixed(2);
  }