export const updateCategoryBrandParams = (searchParams: URLSearchParams, flag: string, value: string) => {
  if (!searchParams.has(flag)) {
    searchParams.set(flag, value);
    return;
  }

  const params = decodeURI(searchParams.get(flag) as string).split('~');

  if (params.includes(value)) {
    if (params.length === 1) {
      searchParams.delete(flag);
      return;
    }

    searchParams.set(flag, params?.filter((param) => param !== value).join('~'));
    return;
  }

  searchParams.set(flag, params.join('~') + '~' + value);
};
