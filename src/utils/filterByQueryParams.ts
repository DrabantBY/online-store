import { sortByFilter } from '../helpers/sortByFilter';

import type { Product, QueryParams } from '../types';

const filterByCategory = (article: Product, value: string | undefined) =>
  !value || value.split('~').includes(article.category);

const filterByBrand = (article: Product, value: string | undefined) =>
  !value || value.split('~').includes(article.brand);

const filterBySearch = (article: Product, value: string | undefined) => {
  return (
    !value ||
    article.category.toLowerCase().includes(value.toLowerCase()) ||
    article.brand.toLowerCase().includes(value.toLowerCase()) ||
    article.title.toLowerCase().includes(value.toLowerCase()) ||
    article.price.toString().includes(value) ||
    article.rating.toString().includes(value) ||
    article.stock.toString().includes(value)
  );
};

const filterByRange = (article: Product, value: string | undefined, flag: 'price' | 'rating') => {
  if (value) {
    const [min, max] = value.split('~').map(Number);
    return min <= article[flag] && article[flag] <= max;
  }
  return true;
};

const isFound = (article: Product, queryParams: QueryParams) => {
  const { category, brand, search, price, rating } = queryParams;
  return (
    filterByCategory(article, category) &&
    filterByBrand(article, brand) &&
    filterBySearch(article, search) &&
    filterByRange(article, price, 'price') &&
    filterByRange(article, rating, 'rating')
  );
};

export const filterByQueryParams = (goods: Product[], queryParams: QueryParams) => {
  const { sort } = queryParams;
  const goodsByFilter = goods.filter((article) => isFound(article, queryParams));
  return sortByFilter(goodsByFilter, sort);
};
