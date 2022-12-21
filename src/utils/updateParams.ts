export const updateParams = (searchParams: URLSearchParams, flag: string, value: string) => {
  if (value) searchParams.set(flag, value);
  else searchParams.delete(flag);
};
