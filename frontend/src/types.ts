export type Navigation = {
  id: number;
  title: string;
  slug: string;
  last_scraped_at?: string | null;
};

export type Category = {
  id: number;
  title: string;
  slug: string;
  product_count?: number;
  navigation?: Navigation | null;
};

export type Product = {
  id: number;
  source_id: string;
  title: string;
  author?: string | null;
  price?: string | null;
  currency?: string | null;
  image_url?: string | null;
  source_url?: string | null;
  last_scraped_at?: string | null;
  category?: Category | null;
};

export type ProductDetail = {
  product_id: number;
  description?: string | null;
  specs?: Record<string, any> | null;
  ratings_avg?: number | null;
  reviews_count?: number;
};

export type Review = {
  id: number;
  product: Product | number;
  author?: string | null;
  rating?: number | null;
  text: string;
  created_at?: string;
};
