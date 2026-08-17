import { Product } from '@/data/products';

export type productFilter = {
  query: string;
  category: string;
  sort: 'name' | 'price-asc' | 'price-desc';
  minPrice?: number;
  maxPrice?: number;
};

export function filterProducts(
  products: Product[],
  filter: productFilter,
): Product[] {
  const query = filter.query.trim().toLowerCase();
  const minPrice = filter.minPrice ?? Number.NEGATIVE_INFINITY;
  const maxPrice = filter.maxPrice ?? Number.POSITIVE_INFINITY;

  return products
    .filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query);
      const matchesCategory =
        filter.category === 'all' || product.category === filter.category;
      const matchesMinPrice = product.price >= minPrice;
      const matchesMaxPrice = product.price <= maxPrice;

      return matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (filter.sort === 'price-asc') return a.price - b.price;
      if (filter.sort === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
}