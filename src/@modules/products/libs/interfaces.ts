export interface IProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    img: string;
}
export interface IProductCreate {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  img: string;
}
export interface IProductResponse extends IProduct {
  data: IProduct;
}
export interface IProductsResponse extends IProduct {
  data: IProduct[];
}
