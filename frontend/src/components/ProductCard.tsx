'use client';
import Link from 'next/link';
import React from 'react';
import { Product } from '../types';

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <Link href={`/product/${p.id}`} className="block">
        <img
          src={p.image_url ?? '/placeholder.png'}
          alt={p.title ?? 'Product'}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-3">
          <h4 className="text-sm font-semibold line-clamp-2">{p.title}</h4>
          <p className="text-xs text-gray-500">{p.author}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm font-medium">{p.price ?? '—'}</div>
            <div className="text-xs text-gray-400">{p.currency ?? ''}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
