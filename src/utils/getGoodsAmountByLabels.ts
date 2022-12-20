import type { Product } from '../types';

export const getGoodsAmountByLabels = (goods: Product[], goodsByFilter: Product[], key: 'category' | 'brand') => {
  const allAmount = goods
    .map((article) => article[key])
    .reduce((acc, category) => {
      if (category in acc) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

  const currentAmount = goodsByFilter
    .map((article) => article[key])
    .reduce((acc, category) => {
      if (category in acc) {
        acc[category]++;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });

  const amount: { [key: string]: number[] } = Object.create(null);

  for (const key in allAmount) {
    if (currentAmount[key]) {
      amount[key] = [currentAmount[key], allAmount[key]];
    } else {
      amount[key] = [0, allAmount[key]];
    }
  }

  return Object.entries(amount);
};
