import useSWR, { SWRConfiguration } from 'swr';
import { fetcher } from '../lib/fetcher';

export function useData<T = any>(key: string | null, config?: SWRConfiguration) {
  const swr = useSWR<T>(key, fetcher, { revalidateOnFocus: false, ...config });
  return swr;
}
