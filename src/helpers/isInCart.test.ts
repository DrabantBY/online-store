import { isInCart } from './handleCart';

test('cannot find by id', () => {
  expect(isInCart([], 24)).toBe(false);
});
