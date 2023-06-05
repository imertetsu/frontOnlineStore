export interface Product{
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  categoryId: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'name'>{
  name: string;
}
//esto hace que los campos sean opcionales
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProductDTO extends Partial<CreateProductDTO>{}

