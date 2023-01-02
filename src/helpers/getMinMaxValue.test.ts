import { getMinMaxValue } from './getMinMaxValue';

const goods = [
  {
    id: 7,
    title: '',
    description: '',
    price: 1499,
    discountPercentage: 4.15,
    rating: 4.25,
    stock: 50,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  },
  {
    id: 5,
    title: 'Huawei P30',
    description: '',
    price: 499,
    discountPercentage: 10.58,
    rating: 4.09,
    stock: 32,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  },
  {
    id: 9,
    title: '',
    description: '',
    price: 1099,
    discountPercentage: 11.83,
    rating: 4.54,
    stock: 96,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  },
];

test('return min and max by price', () => {
  expect(getMinMaxValue(goods, 'price')).toStrictEqual([499, 1499]);
});
