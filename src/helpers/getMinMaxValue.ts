import { Product } from '../types';

export const getMinMaxValue = (goods: Product[], flag: 'price' | 'rating') => {
  const arrByFlag = goods.map((article) => article[flag]).sort((a, b) => a - b);
  return [arrByFlag.at(0), arrByFlag.at(-1)] as [number, number];
};
