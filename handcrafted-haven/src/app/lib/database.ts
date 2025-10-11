import { pool } from "./db";

export async function fetchFromDB<T>(
  table: string,
  filters: Record<string, unknown> = {},
  options?: {
    single?: boolean;
    limit?: number;
    search?: string;
    searchFields?: string[];
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    category?: number;
    minPrice?: number;
    maxPrice?: number;
  }
): Promise<T | T[] | null> {
  try {
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    console.log(`Fetching from ${table} with filters:`, filters);

    let whereClause = "";
    let paramIndex = keys.length + 1;

    if (keys.length > 0) {
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`);
      whereClause = "WHERE " + conditions.join(" AND ");
    }

    // search functIion
    if (options?.search && options?.searchFields) {
      const searchConditions = options.searchFields.map(
        (field) => `${field} ILIKE $${paramIndex++}`
      );
      const searchValue = `%${options.search}%`;

      // Push the search value for each search field
      options.searchFields.forEach(() => {
        values.push(searchValue);
      });

      if (whereClause) {
        whereClause += ` AND (${searchConditions.join(" OR ")})`;
      } else {
        whereClause = "WHERE " + searchConditions.join(" OR ");
      }
    }

    if (options?.category !== undefined) {
      values.push(options.category);
      if (whereClause) {
        whereClause += ` AND category_id = $${paramIndex++}`;
      } else {
        whereClause = `WHERE category_id = $${paramIndex++}`;
      }
    }

    // Add price range
    if (options?.minPrice !== undefined) {
      values.push(options.minPrice);
      if (whereClause) {
        whereClause += ` AND product_price >= $${paramIndex++}`;
      } else {
        whereClause = `WHERE product_price >= $${paramIndex++}`;
      }
    }

    if (options?.maxPrice !== undefined) {
      values.push(options.maxPrice);
      if (whereClause) {
        whereClause += ` AND product_price <= $${paramIndex++}`;
      } else {
        whereClause = `WHERE product_price <= $${paramIndex++}`;
      }
    }

    let orderClause = "";
    if (options?.sortBy) {
      const sortOrder = options.sortOrder || "ASC";
      orderClause = ` ORDER BY ${options.sortBy} ${sortOrder}`;
    }

    // Add amount
    let limitClause = "";
    if (options?.limit) {
      limitClause = ` LIMIT ${options.limit}`;
    }

    const query = `SELECT * FROM ${table} ${whereClause}${orderClause}${limitClause}`;
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

//fetch categories
export async function fetchCategories(): Promise<
  { category_id: number; category_name: string }[]
> {
  try {
    const query = "SELECT * FROM category ORDER BY category_name";
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
