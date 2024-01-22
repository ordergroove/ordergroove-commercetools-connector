export interface OrdergrooveProduct {
  product_id: string;
  sku: string;
  name: string;
  price: number;
  live: boolean;
  image_url: string;
  detail_url: string;
}

export interface OrdergrooveApiResponse {
  success: boolean;
  status: number;
  product?: OrdergrooveProduct;
}

export interface JobStatus {
  currentOffset?: number;
  status?: string;
  thisCustomObjectExists: boolean;
}