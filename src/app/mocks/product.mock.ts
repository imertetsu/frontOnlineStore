import { faker } from '@faker-js/faker';

import { Product } from '../models/product.model';


export const generateOneProduct = (): Product => {
  return {
    id: faker.number.int({ min: 1 }),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    images: [faker.image.url(), faker.image.url()],
    description: faker.commerce.productDescription(),
    categoryId: faker.number.int({ min: 1, max: 20 })
  }
}
export function generateManyProducts(size = 5) {
  const PRODUCTS: Product[] = faker.helpers.multiple(generateOneProduct, {
    count: size,
  });
  return PRODUCTS;
}
