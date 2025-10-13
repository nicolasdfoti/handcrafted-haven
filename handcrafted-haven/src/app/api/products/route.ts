import { NextRequest, NextResponse } from "next/server";
import { fetchFromDB } from "@/app/lib/database";
import { Product } from "@/app/lib/definitions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category")
      ? parseInt(searchParams.get("category")!)
      : undefined;
    const sortBy = searchParams.get("sortBy") || "product_date";
    const sortOrder =
      (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 50;
    const minPrice = searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined;

    const products = (await fetchFromDB(
      "products",
      {},
      {
        limit,
        search,
        searchFields: ["product_title", "product_description"],
        sortBy,
        sortOrder,
        category,
        minPrice,
        maxPrice,
      }
    )) as Product[];

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
