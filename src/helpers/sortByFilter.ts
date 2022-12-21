import type { Product } from '../types';
export const sortByFilter = (goods: Product[], value: string | undefined) => {
  if (value) {
    const [prop, direction] = value.split('-');
    if (direction === 'asc') goods.sort((a, b) => a[prop as 'price' | 'rating'] - b[prop as 'price' | 'rating']);
    if (direction === 'desc') goods.sort((a, b) => b[prop as 'price' | 'rating'] - a[prop as 'price' | 'rating']);
  }
};
