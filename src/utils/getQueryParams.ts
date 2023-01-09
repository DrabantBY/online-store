import type { QueryParams } from '../types';

export const getQueryParams = (searchParams: URLSearchParams) => {
  if (!searchParams.toString()) return null;
  const queryParams: QueryParams = {};
  searchParams
    .toString()
    .split('&')
    .map((param) => param.split('=', 1))
    .flat()
    .forEach((key) => (queryParams[key as keyof QueryParams] = decodeURI(searchParams.get(key) as string)));
  return queryParams;
};
