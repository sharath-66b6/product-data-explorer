'use client';
import React from 'react';
import NavigationGrid from '../components/NavigationGrid';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Product Data Explorer</h1>
        <p className="text-sm text-gray-600">Explore books scraped from World of Books</p>
      </header>

      <section aria-labelledby="nav-heading">
        <h2 id="nav-heading" className="sr-only">Navigation headings</h2>
        <NavigationGrid />
      </section>

      <footer className="mt-12 text-sm text-gray-500">Built with Crawlee + Playwright + NestJS</footer>
    </main>
  );
}
