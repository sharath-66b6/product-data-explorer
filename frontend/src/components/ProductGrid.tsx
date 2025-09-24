'use client';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import ProductCard from './ProductCard';
import { fetcher } from '../lib/fetcher';
import { Product } from '../types';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = { categorySlug: string; perPage?: number };

export default function ProductGrid({ categorySlug, perPage = Number(process.env.NEXT_PUBLIC_PER_PAGE || 20) }: Props) {
  
  const search = useSearchParams();
  const router = useRouter();
  const page = Number(search.get('page') ?? '1');

  const key = `/products?categorySlug=${encodeURIComponent(categorySlug)}&page=${page}&limit=${perPage}`;
  const { data, error } = useSWR<{ items: Product[]; total: number }>(key, fetcher);

  const total = data?.total ?? 0;
  const items = data?.items ?? [];

  if (error) return <div role="alert">Failed to load products</div>;
  if (!data) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {Array.from({ length: perPage }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white border rounded h-64" />
        ))}
      </div>
    );
  }

  function goTo(p: number) {
    router.push(`/category/${categorySlug}?page=${p}`);
  }

  const lastPage = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    // scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // optional: prefetch next page into SWR cache
    if (page < lastPage) {
      const nextKey = `/products?categorySlug=${encodeURIComponent(categorySlug)}&page=${page+1}&limit=${perPage}`;
      // fetch and store into SWR cache
      fetch(nextKey).then(res => res.json()).then(data => {
        // do nothing, SWR will cache it automatically
      }).catch(() => {/* ignore errors */});
    }
  }, [page, categorySlug, perPage, lastPage]);

  return (
    <div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {items.map((it) => (
          <ProductCard key={it.id} p={it} />
        ))}
      </div>

      <nav aria-label="Pagination" className="mt-4 flex items-center justify-center gap-2">
        <button disabled={page <= 1} onClick={() => goTo(page - 1)} className="px-3 py-1 border rounded">
          Prev
        </button>
        <span className="px-3 py-1">Page {page} / {lastPage}</span>
        <button disabled={page >= lastPage} onClick={() => goTo(page + 1)} className="px-3 py-1 border rounded">
          Next
        </button>
      </nav>
    </div>
  );

  
}
