'use client';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { pushLocalHistory } from '@/hooks/useViewHistory';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams<{ slug: string | string[] }>();
  const search = useSearchParams();

  // Normalize slug into a single string
  const rawSlug = params?.slug;
  const categorySlug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? 'unknown';

  const page = search?.get('page') ?? '1';

  useEffect(() => {
    pushLocalHistory({
      path: `/category/${categorySlug}?page=${page}`,
      title: `Category ${categorySlug}`,
      ts: Date.now(),
    });
  }, [categorySlug, page]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <Link href="/" className="text-sm text-blue-600">
        &larr; Home
      </Link>
      <h1 className="text-2xl mt-2 font-bold">Category: {categorySlug}</h1>

      <section className="mt-6">
        <ProductGrid categorySlug={categorySlug} perPage={12} />
      </section>
    </main>
  );
}
