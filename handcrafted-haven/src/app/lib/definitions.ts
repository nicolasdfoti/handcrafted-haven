export type Product = {
  product_id: number;
  product_title: string;
  product_date: string;
  product_description: string;
  product_image: string;
  product_thumbnail: string;
  product_price: number;
  category_id: number;
  account_id: number;
};

export type Account = {
  account_id: number;
  account_email: string;
  account_username: string;
  account_password: string;
  account_type: string;
  account_company_name?: string;
  account_firstname?: string;
  account_lastname?: string;
  account_phone?: string;
  account_website?: string;
};

export type User = {
  account_id: string;
  account_firstname: string;
  account_email: string;
  account_password: string;
};

export type Seller = {
  account_id?: number,
  company_name?: string,
  phone?: string,
  website?: string
}