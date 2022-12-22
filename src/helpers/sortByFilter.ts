import type { Product } from '../types';
export const sortByFilter = (goods: Product[], value: string | undefined) => {
  if (!value) return goods;

  const [prop, direction] = value.split('-');
  const ascSort = (a: Product, b: Product): number => a[prop as 'price' | 'rating'] - b[prop as 'price' | 'rating'];
  const descSort = (a: Product, b: Product): number => b[prop as 'price' | 'rating'] - a[prop as 'price' | 'rating'];

  return [...goods].sort(direction === 'asc' ? ascSort : descSort);
};
