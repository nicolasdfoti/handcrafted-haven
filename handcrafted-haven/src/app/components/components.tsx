import React from "react";
import { Product } from "../lib/definitions";
import styles from "@styles/components.module.scss";
import Link from "next/link";
import { pool } from "@/app/lib/db";
import { Account, Seller } from "@/app/lib/definitions";
import Image from "next/image";

export type ContactType = "email" | "phone" | "website";

export interface ContactItemProps {
  label: string;
  value: string | number | null | undefined;
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
export const formatPhoneNumber = (phone: string | number): string => {
  const stringPhone = String(phone);
  const cleaned = stringPhone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return stringPhone;
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

  const stringValue = String(value);

  const formattedValue = type === "phone" ? formatPhoneNumber(stringValue) : stringValue;
  const href =
    type === "email"
      ? `mailto:${stringValue}`
      : type === "phone"
      ? `tel:${stringValue}`
      : stringValue;

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
  className,
  showDescription = true,
  showPrice = true,
}: ProductCardProps) {

  const getImageSrc = (path?: string | null) => {
    if (!path) return "/images/placeholder.jpg"; 
    if (!path.startsWith("/")) return `/${path}`; 
    return path; 
  };

    return (
    <article className={`${styles.card} ${className || ""}`}>
      <Link href={`${basePath}/${product.product_id}/view`}>


        <div className={styles.card_header}>
          <h3 className={styles.card_title}>{product.product_title}</h3>
        </div>

        <div className={styles.card_image_wrapper}>
          <Image
            src={getImageSrc(product.product_image)}
            alt={product.product_title}
            width={250}
            height={200}
            className={styles.card_image}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.card_body}>
          {showDescription && (
            <p className={styles.product_description}>
              {product.product_description}
            </p>
          )}
          {showPrice && (
            <div className={styles.product_price}>
              ${product.product_price}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export interface SellerCardProps {
  account: Account;
  seller: Seller;
  basePath?: string;
  className?: string;
}

export function SellerCard({
  seller,
  account,
  basePath = "/sellers",
  className,
}: SellerCardProps) {
  return (
    <Link
      href={`${basePath}/${account.account_id}`}
      className={`${styles.seller_container} ${className || ""}`}
    >
      <div>
        <h2 className={styles.seller_title}>{seller.company_name}</h2>
        <h3>
          by {account.account_firstname} {account.account_lastname}
        </h3>
        <p className={styles.seller_website}>{seller.website}</p>
      </div>
    </Link>
  );
}

export function ProductListing({
  product,
  basePath = "/explore",
}: ProductCardProps) {

  const getImageSrc = (path?: string | null) => {
    if (!path) return "/images/placeholder.jpg"; 
    if (!path.startsWith("/")) return `/${path}`; 
    return path; 
  };

  return (
    <div className={`${styles.marketplace__product_card}`}>
      <Link href={`${basePath}/${product.product_id}/view`}>
        <div className={styles.marketplace__product_card_body}>
          <div>
            <Image
              src={getImageSrc(product.product_image)}
              alt={product.product_title}
              width={250}
              height={250}
              className={styles.marketplace_card_image}
              style={{ objectFit: "cover" }}
            />
          </div>

            <h3 className={styles.marketplace__product_card_title}>
              {product.product_title}
            </h3>{" "}
            <div className={styles.marketplace__product_card_price}>
              {" "}
              ${product.product_price}{" "}
            </div>
        </div>
      </Link>
    </div>
  );
}

export async function fetchFromDB<T>(
  table: string,
  filters: Record<string, unknown> = {},
  options?: { single?: boolean; limit?: number }
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

    let limitClause = "";
    if (options?.limit) {
      limitClause = ` LIMIT ${options.limit}`;
    }

    const query = `SELECT * FROM ${table} ${whereClause}${limitClause}`;
    console.log(`Query: ${query}`, values);

    const result = await pool.query(query, values);
    console.log(`Found ${result.rows.length} rows`);

    if (result.rows.length === 0) {
      return options?.single ? null : [];
    }

    return options?.single ? (result.rows[0] as T) : (result.rows as T[]);
  } catch (err) {
    console.error("DB fetch error:", err);
    throw new Error("Database query failed");
  }
}
