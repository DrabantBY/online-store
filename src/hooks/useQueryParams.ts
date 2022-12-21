import { useSearchParams } from 'react-router-dom';
import { updateCategoryBrandParams } from '../utils/updateCategoryBrandParams';
import { getQueryParams } from '../utils/getQueryParams';
import type { QueryParams } from '../types';
import { updateSearchSortParams } from '../utils/updateSearchSortParams';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParams = (flag: string, value: string) => {
    switch (true) {
      case flag === 'category' || flag === 'brand':
        updateCategoryBrandParams(searchParams, flag, value);
        break;
      case flag === 'search' || flag === 'sort':
        updateSearchSortParams(searchParams, flag, value);
        break;
    }
    setSearchParams(searchParams);
  };

  const queryParams = getQueryParams(searchParams);

  const isChecked = (flag: string, value: string) => {
    if (queryParams) {
      return queryParams[flag as keyof QueryParams]?.split('~').includes(value);
    }
    return false;
  };

  const searchValue = searchParams.get('search') || '';
  const sortValue = searchParams.get('sort') || '';

  return { queryParams, searchValue, sortValue, isChecked, setQueryParams };
};
