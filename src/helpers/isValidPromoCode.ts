export const isValidPromoCode = (promoState: string[], value: string) =>
  /^promo-code-\d+$/.test(value) && !promoState.includes(value);
