import { useEffect } from 'react';
import { api } from '../lib/fetcher';

const STORAGE_KEY = 'pde:view_history'; // Product Data Explorer

export type ViewEntry = { path: string; title?: string; ts: number };

export function pushLocalHistory(entry: ViewEntry) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: ViewEntry[] = raw ? JSON.parse(raw) : [];
    arr.unshift(entry);
    // keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, 50)));
  } catch (e) {
    // ignore
  }
}

export function useSyncHistoryToServer(sessionId?: string | null) {
  useEffect(() => {
    const sync = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const arr: ViewEntry[] = JSON.parse(raw);
        if (arr.length === 0) return;
        // POST last N entries to backend view_history endpoint
        await api.post('/view-history', { session_id: sessionId || null, path_json: arr });
        // optionally clear local storage on success: keep it local but you can prune
      } catch (e) {
        // ignore failure
      }
    };

    const id = setInterval(sync, 1000 * 30); // sync every 30s in background
    window.addEventListener('beforeunload', sync);
    return () => {
      clearInterval(id);
      window.removeEventListener('beforeunload', sync);
    };
  }, [sessionId]);
}
