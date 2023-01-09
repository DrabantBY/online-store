import { getFromCart } from './handleCart';

test('return default object', () => {
  expect(getFromCart([])).toStrictEqual({ total: 0, amount: 0 });
});
