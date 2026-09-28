interface Item {
  price: number;
  qty: number;
}

function applyDiscountBuggy(items: Item[]): number {
  let total = 0;
  let applied = 0;

  for (let index = 0; index < items.length; index++) {
    const currentItem = items[index];
    total += currentItem.price * currentItem.qty;

    console.log('iteração', index, {
      currentItem,
      total,
      applied,
      raw: currentItem.price * currentItem.qty,
    });

    if (total > 200 && applied < 2) {
      total = total - total * 0.05;
      applied++;
      console.log('desconto aplicado', { index, total, applied });
    }
  }

  return Number(total.toFixed(2));
}

function applyDiscountFixed(items: Item[]): number {
  const grossTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = grossTotal > 200 ? grossTotal * 0.05 : 0;
  return Number((grossTotal - discount).toFixed(2));
}

const orderA: Item[] = [
  { price: 100, qty: 1 },
  { price: 150, qty: 1 },
  { price: 50, qty: 2 },
];

const orderB: Item[] = [
  { price: 50, qty: 2 },
  { price: 150, qty: 1 },
  { price: 100, qty: 1 },
];

console.log('--- antes da correção: mesma lista em ordem diferente ---');
console.log('ordem A:', applyDiscountBuggy(orderA));
console.log('ordem B:', applyDiscountBuggy(orderB));

console.log('\n--- depois da correção ---');
console.log('ordem A:', applyDiscountFixed(orderA));
console.log('ordem B:', applyDiscountFixed(orderB));

console.log('\n--- cenário extra: item único acima de 200 ---');
console.log('valor único:', applyDiscountFixed([{ price: 500, qty: 1 }]));
