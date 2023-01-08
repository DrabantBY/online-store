import goods from '../goods.json';

import type { CartItem, CartProduct, Product } from '../types';

export const removeFromCart = (cartState: CartItem[], id: number) => cartState.filter((item) => item.id !== id);

export const isInCart = (cartState: CartItem[], id: number) => cartState.some((item) => item.id === id);

export const addToCart = (cartState: CartItem[], data: CartItem) => {
  if (!cartState.length) return data.amount > 0 ? [data] : [];

  const element = cartState.find((item) => item.id === data.id);

  if (!element) return [...cartState, data].sort((a, b) => a.id - b.id);

  const { amount } = element;
  data.amount += amount;
  const result = cartState.filter((item) => item.id !== data.id);

  return data.amount ? [...result, data].sort((a, b) => a.id - b.id) : result;
};

export const getFromCart = (cart: CartItem[]) => {
  if (!cart?.length) return { total: 0, amount: 0 };

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

export const getGoodsCartPerPage = (cartState: CartItem[] | null, page: number, limit: number) => {
  if (!cartState) return [0, []];

  const pageNumber = Math.ceil(cartState.length / limit);
  const slicePoint = page * limit;
  const startSlicePoint = slicePoint - limit;

  const goodsCart = cartState.map((item, index) => {
    const article = goods.find((article) => article.id === item.id) as Product;
    const { amount } = item;
    return { article, amount, index };
  });

  const goodsCartPerPage: CartProduct[] =
    page === pageNumber ? goodsCart.slice(startSlicePoint) : goodsCart.slice(startSlicePoint, slicePoint);

  return [pageNumber, goodsCartPerPage];
};
