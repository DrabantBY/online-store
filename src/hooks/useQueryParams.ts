import { useSearchParams } from 'react-router-dom';
import { updateCategoryBrandParams } from '../utils/updateCategoryBrandParams';
import { getQueryParams } from '../utils/getQueryParams';
import type { QueryParams } from '../types';
import { updateParams } from '../utils/updateParams';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = getQueryParams(searchParams);

  const setQueryParams = (flag: string, value: string) => {
    switch (true) {
      case flag === 'category' || flag === 'brand':
        updateCategoryBrandParams(searchParams, flag, value);
        break;
      default:
        updateParams(searchParams, flag, value);
    }
    setSearchParams(searchParams);
  };

  const isChecked = (flag: string, value: string) => {
    if (!queryParams) return false;
    return queryParams[flag as keyof QueryParams]?.split('~').includes(value) ?? false;
  };

  const getRangeFilterValues = (flag: 'price' | 'rating') => {
    const params = searchParams.get(flag);

    if (!params) return;

    return params.split('~').map(Number);
  };

  const resetFilters = () => {
    const view = searchParams.get('view');
    setSearchParams(view ? { view } : {});
  };

  const searchValue = searchParams.get('search') || '';
  const sortValue = searchParams.get('sort') || '';
  const viewValue = searchParams.get('view') || 'block';

  return {
    queryParams,
    searchValue,
    sortValue,
    viewValue,
    getRangeFilterValues,
    isChecked,
    setQueryParams,
    setSearchParams,
    resetFilters,
  };
};
