"use server";

import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { pool } from "@/app/lib/db"; 
import { auth } from "../../auth";


export const authenticate = async (state: string | undefined, formData: FormData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};

// Add a new review for a product
export async function addReview(productId: number, rating: number, comment: string) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const accountId = session.user.id;

  // insert the new review into the database
  await pool.query(
    `INSERT INTO reviews (product_id, account_id, rating, comment)
     VALUES ($1, $2, $3, $4)`,
    [productId, accountId, rating, comment]
  );

  // return the updated list of reviews
  return getReviews(productId);
}

// Fetch reviews and average rating for a product
export async function getReviews(productId: number) {
  const { rows } = await pool.query(
    `SELECT 
       r.*, 
       a.account_firstname, 
       s.company_name
     FROM reviews r
     JOIN account a ON a.account_id = r.account_id
     LEFT JOIN seller_info s ON s.account_id = a.account_id
     WHERE r.product_id = $1
     ORDER BY r.created_at DESC`,
    [productId]
  );

  // Calculate average rating
  const avgRating =
    rows.length > 0
      ? rows.reduce((sum, r) => sum + r.rating, 0) / rows.length
      : 0;

  return { reviews: rows, avgRating };
}