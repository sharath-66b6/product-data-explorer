import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL ?? '';

export const api = axios.create({
  baseURL: API || undefined,
  headers: { 'Content-Type': 'application/json' },
});

// convenient fetcher for SWR (path like '/navigation' or '/categories?nav=slug')
export const fetcher = (url: string) =>
  api.get(url.startsWith('/') ? url : `/${url}`).then(res => res.data);
