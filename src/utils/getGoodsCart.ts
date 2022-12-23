import type { Cart } from '../types';
import goods from '../goods.json';

export const getGoodsCart = () => {
  const data = localStorage.getItem('cart');
  if (!data) return { total: 0, amount: 0 };
  const cart: Cart[] = JSON.parse(data);
  const result = cart.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      const article = goods.find((article) => article.id === item.id);
      const sum = (article?.price ?? 0) * item.amount;
      acc.total += sum;
      return acc;
    },
    { total: 0, amount: 0 }
  );

  return result;
};
