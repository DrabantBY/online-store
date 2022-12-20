import type { Product, QueryParams } from '../types';

const filterByCategory = (article: Product, value: string | undefined) =>
  !value || value.split('~').includes(article.category);

const filterByBrand = (article: Product, value: string | undefined) =>
  !value || value.split('~').includes(article.brand);

const filterBySearch = (article: Product, value: string | undefined) => {
  return (
    !value ||
    article.category.includes(value) ||
    article.brand.includes(value) ||
    article.title.includes(value) ||
    article.price.toString().includes(value) ||
    article.rating.toString().includes(value) ||
    article.stock.toString().includes(value)
  );
};

export const isFound = (article: Product, queryParams: QueryParams) => {
  const { category, brand, search } = queryParams;
  return filterByCategory(article, category) && filterByBrand(article, brand) && filterBySearch(article, search);
};

export const filterByQueryParams = (goods: Product[], queryParams: QueryParams) => {
  return goods.filter((article) => isFound(article, queryParams));
};
