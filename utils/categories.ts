"use client";
import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
  count: number;
  slug: string;
  is_active: boolean;
  image?: string;
  created_at: string;
  updated_at: string;
}

// This function fetches categories from the ADMIN API
export async function fetchCategories(): Promise<Category[]> {
  try {
    // Use the admin endpoint
    const baseUrl =
      typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";
    const response = await fetch(`${baseUrl}/api/admin/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Fallback to default categories if API fails
    return [
      {
        id: "company",
        name: "Company",
        count: 0,
        slug: "company",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "market",
        name: "Market",
        count: 0,
        slug: "market",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "trading",
        name: "Trading",
        count: 0,
        slug: "trading",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }
}

// For backward compatibility and initial values
export let categories: string[] = ["Company", "Market", "Trading"];
export let categoriesWithId: { id: string; name: string; slug: string }[] = [
  { id: "company", name: "Company", slug: "company" },
  { id: "market", name: "Market", slug: "market" },
  { id: "trading", name: "Trading", slug: "trading" },
];

// Add type safety
export type CategoryId = (typeof categoriesWithId)[number]["id"];

// Find category by ID or slug, considering all possible variations
function findCategoryByIdOrSlug(categoryIdOrSlug: string) {
  if (!categoryIdOrSlug) {
    console.log("No category ID or slug provided");
    return null;
  }

  // Clean up the input
  const cleanInput = categoryIdOrSlug.trim().toLowerCase();
  console.log("Finding category for:", cleanInput);
  console.log(
    "Available categories:",
    JSON.stringify(categoriesWithId, null, 2),
  );

  // Try different matching strategies
  let category = categoriesWithId.find((c) => c.id === cleanInput);
  console.log("Exact ID match:", category);

  // Match by lowercase ID
  if (!category) {
    category = categoriesWithId.find((c) => c.id.toLowerCase() === cleanInput);
    console.log("Lowercase ID match:", category);
  }

  // Match by name
  if (!category) {
    category = categoriesWithId.find(
      (c) => c.name.toLowerCase() === cleanInput,
    );
    console.log("Name match:", category);
  }

  // Match by slug
  if (!category) {
    category = categoriesWithId.find(
      (c) => c.slug.toLowerCase() === cleanInput,
    );
    console.log("Slug match:", category);
  }

  // Match by slug (handle hyphens)
  if (!category) {
    const normalizedInput = cleanInput.replace(/-/g, "");
    console.log("Normalized input (no hyphens):", normalizedInput);

    category = categoriesWithId.find((c) => {
      const normalizedSlug = c.slug.toLowerCase().replace(/-/g, "");
      console.log(`Comparing ${normalizedSlug} with ${normalizedInput}`);
      return normalizedSlug === normalizedInput;
    });
    console.log("Normalized slug match:", category);
  }

  // Match by slug (exact match)
  if (!category) {
    category = categoriesWithId.find(
      (c) => c.slug.toLowerCase() === cleanInput,
    );
    console.log("Exact slug match:", category);
  }

  // Match by slug (case-insensitive)
  if (!category) {
    category = categoriesWithId.find(
      (c) => c.slug.toLowerCase() === cleanInput.toLowerCase(),
    );
    console.log("Case-insensitive slug match:", category);
  }

  // If still no match, try to find a partial match
  if (!category) {
    category = categoriesWithId.find(
      (c) =>
        c.slug.toLowerCase().includes(cleanInput) ||
        cleanInput.includes(c.slug.toLowerCase()),
    );
    console.log("Partial match:", category);
  }

  console.log("Final result:", category);
  return category;
}

// React hook to get categories from the API
export function useCategories() {
  const [cats, setCats] = useState(categoriesWithId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        console.log("Loading categories from API...");
        const data = await fetchCategories();
        console.log("API returned categories:", data);

        if (data && data.length > 0) {
          const formatted = data.map((cat) => ({
            id: cat.id.toString(), // Ensure IDs are strings
            name: cat.name,
            slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
          }));
          console.log("Formatted categories:", formatted);
          setCats(formatted);
          // Also update the static exports for compatibility
          categoriesWithId = formatted;
          categories = formatted.map((c) => c.name);
        } else {
          console.warn("No categories returned from API, using defaults");
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories: cats, loading, findCategoryByIdOrSlug };
}

// Helper function to convert a string to a slug-friendly ID
export function IDfy(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
