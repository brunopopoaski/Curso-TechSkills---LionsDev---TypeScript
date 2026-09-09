

function calculateTotal(prices: number[]): number {
let subtotal: number = 0;
console.log(prices.length);
for (let index = 0; index < prices.length; index++) {
subtotal += prices[index]!;
}
if (subtotal >= 100) {
return subtotal - (subtotal * 0.1);
}
return subtotal;
}
console.log(calculateTotal([20, 30]));
console.log(calculateTotal([40, 60]));
console.log(calculateTotal([80, 40]));
console.log(calculateTotal([]));