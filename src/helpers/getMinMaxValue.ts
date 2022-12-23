import goods from '../goods.json';

export const getMinMaxValue = (flag: 'price' | 'rating') => {
  const arrByFlag = goods.map((article) => article[flag]).sort((a, b) => a - b);
  return [arrByFlag.at(0), arrByFlag.at(-1)] as [number, number];
};
