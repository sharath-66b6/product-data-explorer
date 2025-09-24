'use client';
import React from 'react';
import Link from 'next/link';
import { useData } from '../hooks/useSWR';
import { Navigation } from '../types';
import clsx from 'clsx';

export default function NavigationGrid() {
  const { data, error } = useData<Navigation[]>('/navigation'); // backend: GET /navigation
  if (error) return <div role="alert">Failed to load navigation.</div>;
  if (!data) return <div className="grid gap-4 grid-cols-2 md:grid-cols-4">Loading…</div>;

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {data.map(nav => (
        <Link key={nav.id} href={`/category/${nav.slug}`} className="block">
          <div
            className={clsx('p-4 rounded-lg shadow-sm hover:shadow-md transition', 'bg-white dark:bg-gray-800')}
            role="button"
            tabIndex={0}
            aria-label={`Open ${nav.title}`}
          >
            <h3 className="font-semibold">{nav.title}</h3>
            <p className="text-sm text-gray-500">{nav.slug}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
