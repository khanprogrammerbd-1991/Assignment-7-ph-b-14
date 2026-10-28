// src/lib/utils.js

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

// 1. Arrow function to get all categories
export const getAllCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data;
};

// 2. Arrow function to get all products
export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

// 3. Arrow function to convert English numbers to Bangla numbers
const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBanglaNumber = (num) => {
  if (num === undefined || num === null) return "০";
  return String(num).replace(/[0-9]/g, (digit) => banglaDigits[digit]);
};