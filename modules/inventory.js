export class donutData {
  donutName;
  donutPrice;
  donutQuantityInStore;
  donutQuantitySold;
  donutIndividualRevenue;

  constructor(name, price, quantity) {
    this.donutName = name;
    this.donutPrice = price;
    this.donutQuantityInStore = quantity;
    this.donutQuantitySold = 0;
    this.donutIndividualRevenue = 0;
  }
}
export var shopRevenue = 0;
export var shopTotalSold = 0;
export var shopInventory = {
  glazed: new donutData("Glazed Donut", 0.88, 136),
  jelly: new donutData("Jelly-Filled Donut", 1.1, 124),
  cream: new donutData("Butter-cream Bismark", 1, 124),
  maple: new donutData("Maple Bar", 1, 124),
  apple: new donutData("Apple Fritter", 1, 124),
  hole: new donutData("Donut Hole", 0.5, 148)
};

export function recordDonutAddition(donutObject, quantity){
	donutObject["donutQuantityInStore"] += quantity;
}

export function recordOrder(donutObject, quantity, price){
	donutObject["donutQuantityInStore"] -= quantity;
	donutObject["donutQuantitySold"] += quantity;
	donutObject["donutIndividualRevenue"] += price;
	shopTotalSold += quantity;
	shopRevenue += price;
	return;
}