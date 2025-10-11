"use client";

import React, { useState, useEffect } from "react";
import styles from "@styles/page.module.scss";

interface FilterProps {
  onSortChange: (sortBy: string, sortOrder: "ASC" | "DESC") => void;
  onPriceRangeChange: (
    minPrice: number | undefined,
    maxPrice: number | undefined
  ) => void;
  initialMinPrice?: number | undefined;
  initialMaxPrice?: number | undefined;
}

export function Filter({
  onSortChange,
  onPriceRangeChange,
  initialMinPrice,
  initialMaxPrice,
}: FilterProps) {
  const [sortBy, setSortBy] = useState("product_date");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [minPrice, setMinPrice] = useState<string>(
    initialMinPrice?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initialMaxPrice?.toString() || ""
  );

  // update price inputs when initial values change
  // the issue is here, need to make this also take in the search filter
  useEffect(() => {
    setMinPrice(initialMinPrice?.toString() || "");
    setMaxPrice(initialMaxPrice?.toString() || "");
  }, [initialMinPrice, initialMaxPrice]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder as "ASC" | "DESC");
    onSortChange(newSortBy, newSortOrder as "ASC" | "DESC");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMinPrice(value);
      const minPriceNum = value === "" ? undefined : parseInt(value);
      const maxPriceNum = maxPrice === "" ? undefined : parseInt(maxPrice);
      onPriceRangeChange(minPriceNum, maxPriceNum);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxPrice(value);
      const minPriceNum = minPrice === "" ? undefined : parseInt(minPrice);
      const maxPriceNum = value === "" ? undefined : parseInt(value);
      onPriceRangeChange(minPriceNum, maxPriceNum);
    }
  };

  return (
    <div className={styles["filter__group"]}>
      <label htmlFor="sort-select" className={styles["filter__label"]}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={`${sortBy}-${sortOrder}`}
        onChange={handleSortChange}
        className={styles["filter__select"]}
      >
        <option value="product_date-DESC">Most Recently Posted</option>
        <option value="product_price-DESC">Price: High to Low</option>
        <option value="product_price-ASC">Price: Low to High</option>
        <option value="product_title-ASC">Name: A to Z</option>
        <option value="product_title-DESC">Name: Z to A</option>
      </select>

      <div className={styles["price-range__group"]}>
        <label className={styles["filter__label"]}>Price Range:</label>
        <div className={styles["price-inputs"]}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={styles["price-input"]}
            min="0"
          />
          <span className={styles["price-separator"]}>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={styles["price-input"]}
            min="0"
          />
        </div>
      </div>
    </div>
  );
}
