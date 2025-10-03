import React from 'react';
import { Product } from '../lib/definitions';
import styles from '@styles/components.module.scss';
import Link from "next/link";
import { pool } from "@/app/lib/db";

export type ContactType = "email" | "phone" | "website";

export interface ContactItemProps {
  label: string;
  value: string;
  type: ContactType;
  linkClassName?: string;
  labelClassName?: string;
}

export interface ProductCardProps {
  product: Product;
  basePath?: string;
  className?: string;
  showDescription?: boolean;
  showPrice?: boolean;
}

// formats the phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }
  return phone;
};

// exports the contact item for seller page
export function ContactItem({
  label,
  value,
  type,
  linkClassName = "",
  labelClassName = "",
}: ContactItemProps) {
  if (!value) return null;

  const formattedValue = type === "phone" ? formatPhoneNumber(value) : value;
  const href =
    type === "email"
      ? `mailto:${value}`
      : type === "phone"
      ? `tel:${value}`
      : value;

  const containerClass = styles.contact_item;
  const labelClass = labelClassName || styles.contact_label;
  const linkClass = linkClassName || styles.contact_link;

  return (
    <div className={containerClass}>
      <span className={labelClass}>{label}:</span>
      <a
        href={href}
        className={linkClass}
        target={type === "website" ? "_blank" : undefined}
        rel={type === "website" ? "noopener noreferrer" : undefined}
      >
        {formattedValue}
      </a>
    </div>
  );
}

// exports the product card for seller page
export function ProductCard({
  product,
  basePath = "/explore",
  showDescription = true,
  showPrice = true,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`${basePath}/${product.product_id}/view`}>
        <div className={styles.card_header}>
          <h3 className={styles.card_title}>{product.product_name}</h3>
        </div>
        <div className={styles.card_body}>
          {showDescription && (
            <p className={styles.product_description}>
              {product.product_description}
            </p>
          )}
          {showPrice && (
            <div className={styles.product_price}>${product.product_price}</div>
          )}
        </div>
      </Link>
    </article>
  );
}

export async function fetchFromDB<T>(
  table: string,
  filters: Record<string, unknown> = {},
  options?: { single?: boolean }
): Promise<T | T[] | null> {
  try {
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    console.log(`Fetching from ${table} with filters:`, filters);

    let whereClause = "";
    if (keys.length > 0) {
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`);
      whereClause = "WHERE " + conditions.join(" AND ");
    }

    const query = `SELECT * FROM ${table} ${whereClause}`;
    console.log(`Query: ${query}`, values);
    
    const result = await pool.query(query, values);
    console.log(`Found ${result.rows.length} rows`);

    if (result.rows.length === 0) return null;

    return options?.single
      ? (result.rows[0] as T)
      : (result.rows as T[]);

  } catch (err) {
    console.error("DB fetch error:", err);
    throw new Error("Database query failed");
  }
}