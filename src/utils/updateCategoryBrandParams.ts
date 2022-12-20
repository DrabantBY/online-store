export const updateCategoryBrandParams = (searchParams: URLSearchParams, flag: string, value: string) => {
  if (searchParams.has(flag)) {
    const params = decodeURI(searchParams.get(flag)!).split('~');
    if (params.includes(value)) {
      if (params.length === 1) {
        searchParams.delete(flag);
      } else {
        const newParams = params?.filter((param) => param !== value).join('~');
        searchParams.set(flag, newParams);
      }
    } else {
      const newParams = params.join('~') + '~' + value;
      searchParams.set(flag, newParams);
    }
  } else {
    searchParams.set(flag, value);
  }
};
