export interface Product {
  product_id: number;
  product_description: string;
  product_detailed_description: string;
  product_price: number;
  product_name: string;
  product_images: Array<any>;
  created_at: Date;
  updated_at: Date;
}
