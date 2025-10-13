'use server'

import { auth } from "@/auth";
import { pool } from "../lib/db";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export async function deleteProduct(productId: number) {
    const session = await auth();

    if (!session?.user) {
        throw new Error("You must be logged in to delete a product.");
    }

    try {
        const getProductQuery = 'SELECT product_image, product_thumbnail FROM products WHERE product_id = $1 AND account_id = $2';
        const productResult = await pool.query(getProductQuery, [productId, session.user.id]);
        
        if (productResult.rows.length === 0) {
            throw new Error("Product not found or you don't have permission to delete it.");
        }

        const product = productResult.rows[0];

        if (product.product_image) {
            const imagePath = path.join(process.cwd(), 'public', product.product_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        if (product.product_thumbnail) {
            const thumbnailPath = path.join(process.cwd(), 'public', product.product_thumbnail);
            if (fs.existsSync(thumbnailPath)) {
                fs.unlinkSync(thumbnailPath);
            }
        }

        const deleteQuery = 'DELETE FROM products WHERE product_id = $1 AND account_id = $2';
        await pool.query(deleteQuery, [productId, session.user.id]);

    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    redirect(`/profile/${session.user.id}`);
}

export async function getUserProducts() {
    const session = await auth();

    if (!session?.user) {
        return [];
    }

    try {
        const query = `
            SELECT p.*, c.category_name 
            FROM products p 
            LEFT JOIN category c ON p.category_id = c.category_id 
            WHERE p.account_id = $1 
            ORDER BY p.product_date DESC
        `;
        const result = await pool.query(query, [session.user.id]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}