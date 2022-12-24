import type { Cart } from '../types';
import goods from '../goods.json';

export const removeFromCart = (cartState: Cart[], id: number) => cartState.filter((item) => item.id !== id);

export const isInCart = (cartState: Cart[], id: number) => cartState.some((item) => item.id === id);

export const addToCart = (cartState: Cart[], data: Cart) => {
  if (!cartState.length) return data.amount > 0 ? [data] : [];

  const element = cartState.find((item) => item.id === data.id);

  if (!element) return [...cartState, data];

  const { amount } = element;
  data.amount += amount;
  const result = cartState.filter((item) => item.id !== data.id);

  return data.amount ? [...result, data] : result;
};

export const getFromCart = (cart: Cart[]) => {
  if (!cart.length) return { total: 0, amount: 0 };

  return cart.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      const article = goods.find((article) => article.id === item.id);
      const sum = (article?.price ?? 0) * item.amount;
      acc.total += sum;
      return acc;
    },
    { total: 0, amount: 0 }
  );
};
