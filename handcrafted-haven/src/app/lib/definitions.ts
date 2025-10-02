export type Product = {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  account_id: number;
}

export type Account = {
  account_id: string;
  account_company_name: string;
  account_firstname: string;
  account_lastname: string;
  account_email: string;
  account_phone: string;
  account_website: string;
}