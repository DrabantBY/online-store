export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface QueryParams {
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;
  view?: string;
  price?: string;
  rating?: string;
}


export interface CartItem {
  id: number;
  amount: number;
}

export interface CartProduct {
  article: Product;
  amount: number;
  index: number;

}
