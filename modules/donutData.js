export class donutData {
    donutName;
    donutPrice;
    donutQuantityInStore;
  
    constructor(name, price, quantity) {
      this.donutName = name;
      this.donutPrice = price;
      this.donutQuantityInStore = quantity;
    }
    createInventoryDisplay(descriptor){
        let htmlContent =  
        `<div class="item-box">
          <img src="images/donuts-variety.png" alt="Donut Icon" height="50px">
          <p>${this.donutName}</p>
          <p>Price: ${convertToDollars(this.donutPrice)}</p>
          <p>${this.donutQuantityInStore} in stock.</p>
          <p><em>"${descriptor}"</em></p>
        </div>`;
        return htmlContent;
    }
    createRadioButton(key){
      let htmlContent = 
      `<div>
        <input type="radio" id="donut${key}-button" name="donut-choice" value="${key}">
        <label for="donut${key}-button">${this.donutName} (${convertToDollars(this.donutPrice)} each, ${this.donutQuantityInStore} in stock) </label>
      </div>`
      return htmlContent;
    }
  }



  export function convertToDollars(x){
    return "$" + Number.parseFloat(x).toFixed(2);
  }