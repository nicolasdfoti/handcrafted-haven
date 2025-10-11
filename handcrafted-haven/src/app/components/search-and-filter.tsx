"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "@styles/page.module.scss";

interface Category {
  category_id: number;
  category_name: string;
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categoryId: number | undefined) => void;
}

export function SearchAndFilter({
  onSearch,
  onCategoryChange,
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(query);
        }, 300); // 300ms delay
      };
    })(),
    [onSearch]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId =
      e.target.value === "" ? undefined : parseInt(e.target.value);
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className={`${styles["marketplace__search"]}`}>
      <div className={styles["category-wrapper"]}>
        <select
          id="category-select"
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className={styles["filter__select"]}
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles["search-wrapper"]}>
        <input
          id="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles["search__input"]}
        />
      </div>
    </div>
  );
}
