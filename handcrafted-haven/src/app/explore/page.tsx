"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header.jsx";
import styles from "@styles/page.module.scss";
import { Product } from "@/app/lib/definitions";
import { ProductListings } from "../components/product-listings";
import { SearchAndFilter } from "../components/search-and-filter";
import { Filter } from "../components/filter";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [sortBy, setSortBy] = useState("product_date");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  // fetch products with current filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory)
        params.append("category", selectedCategory.toString());
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);
      if (minPrice !== undefined)
        params.append("minPrice", minPrice.toString());
      if (maxPrice !== undefined)
        params.append("maxPrice", maxPrice.toString());
      params.append("limit", "50");

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  //load fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // refetch when filters change
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, selectedCategory, sortBy, sortOrder, minPrice, maxPrice]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "ASC" | "DESC"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handlePriceRangeChange = (
    newMinPrice: number | undefined,
    newMaxPrice: number | undefined
  ) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  };

  return (
    <div className={`${styles["page"]} ${styles["marketplace__page"]}`}>
      <Header />
      <main className={`${styles["marketplace__container"]}`}>
        <div className={`${styles["marketplace__header"]}`}>
          <h1>Marketplace</h1>
        </div>

        <div className={`${styles["marketplace__dynamic-content"]}`}>
          <SearchAndFilter
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
          />

          <div className={`${styles["marketplace__sidebar"]}`}>
            <Filter
              onSortChange={handleSortChange}
              onPriceRangeChange={handlePriceRangeChange}
              initialMinPrice={minPrice}
              initialMaxPrice={maxPrice}
            />
          </div>

          {loading ? (
            <div className={`${styles["marketplace__products"]}`}>
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductListings products={products || []} />
          )}

          {/*
          <div className={`${styles["marketplace__mobile-sidebar"]}`}>
              <h2>hi</h2>
          </div>*/}
        </div>
      </main>
      <Footer />
    </div>
  );
}
