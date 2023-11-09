export const ALL_CATEGORIES: ProductCategories = {
  category_id: null,
  category_name: "All",
  image_secure_url: null,
  image_url: null,
  products: [],
};

export interface ProductCategories {
  category_id: number | null;
  category_name: string;
  image_secure_url: string | null;
  image_url: string | null;
  products: Array<any>;
}
