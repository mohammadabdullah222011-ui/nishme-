import { useState, useEffect, useCallback } from "react";
import { api, type ApiProduct } from "@/lib/api";
import { type Product } from "@/data/products";

// Map API product → store Product shape
export function mapApiProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description || "منتج جيمينج عالي الجودة",
    price: p.price,
    category: (p.category as Product["category"]) || "pc",
    image: p.imageUrl || `https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80`,
    badge: p.badge || undefined,
    rating: p.rating,
    reviews: p.reviews,
  };
}

export function useProducts(pollMs = 10000) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data.map(mapApiProduct));
      setError(null);
    } catch (e: any) {
      if (!silent) setError(e.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(() => fetch(true), pollMs);
    return () => clearInterval(interval);
  }, [fetch, pollMs]);

  return { products, loading, error, refetch: fetch };
}
