"use server"

import { auth } from "@/auth";
import { pool } from "../lib/db";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("You must be logged in to create a product.");

  const account_id = session.user.id;
  const product_title = formData.get("product_title")?.toString() || "";
  const product_price = parseFloat(formData.get("product_price")?.toString() || "0");
  const product_date = formData.get("product_date")?.toString() || "";
  const product_description = formData.get("product_description")?.toString() || "";
  const category_id = formData.get("category_id")?.toString() || "";

  const product_image = formData.get("product_image")?.toString() || "";
  const product_thumbnail = formData.get("product_thumbnail")?.toString() || "";

  if (!product_title.trim() || product_price <= 0 || !product_date) {
    throw new Error("Missing required fields or invalid data");
  }

  const query = `
    INSERT INTO products (
      product_title,
      product_price,
      account_id,
      product_date,
      product_description,
      product_image,
      product_thumbnail,
      category_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  `;

  const values = [
    product_title,
    product_price,
    account_id,
    product_date,
    product_description,
    product_image,
    product_thumbnail,
    parseInt(category_id),
  ];

  await pool.query(query, values);
  redirect("/sellers");
}