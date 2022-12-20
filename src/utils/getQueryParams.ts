import type { QueryParams } from '../types';

export const getQueryParams = (searchParams: URLSearchParams) => {
  if (searchParams.toString()) {
    const queryParams: QueryParams = Object.create(null);
    searchParams
      .toString()
      .split('&')
      .map((param) => param.split('=', 1))
      .flat()
      .forEach((key) => (queryParams[key as keyof QueryParams] = decodeURI(searchParams.get(key)!)));
    return queryParams;
  }
  return null;
};
