export const updateSearchParams = (searchParams: URLSearchParams, value: string) => {
  if (value) searchParams.set('search', value);
  else searchParams.delete('search');
};
