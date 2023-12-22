const taxRate = 0.07
const temp = 10
//takes baseprice and list of customizations to calcuate and items final price
export const calculateCustomizedPrice = (customizations, basePrice) => {
  const customizedPrice = customizations.reduce((sum, item) => {
    return sum + item.priceMod;
  }, 0);
  return basePrice + customizedPrice;
};

// takes order contex to calulate price before tax returns floating point
export const subTotalPrice = (order) => {
  const orderTotal = order.reduce((sum, item) => {
   
    return sum + calculateCustomizedPrice(item.customizations, item.basePrice)
  }, 0)
  return Number(orderTotal.toFixed(2))
  // return temp.toFixed(2)
}

//calculates tax based on rate returns floating point 
export const afterTax = (subtotal) => {
  const total = subtotal * (1 + taxRate)
  // return temp.toFixed(2)
  return Number(total.toFixed(2))
}
