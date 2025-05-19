import useSWR from 'swr';
// import { api } from "@/app/_utils/api";
import { supabase } from '../_libs/supabase';

type SWRConfiguration = any;

const fetcher = async <T>(path: string): Promise<T | undefined> => {
  // 認証トークン
  const token = (await supabase.auth.getSession()).data.session?.access_token;
  const res = await api.get(path, {
    headers: {
      Authorization: `Bearer ${token}`, // ヘッダーに認証トークンを追加
    },
  });

  if (res.status !== 200) {
    const error = new Error('An error occurred while fetching the data.');
    error.message = res.data.message;
    throw error;
  }

  return res.data;
};

export const useFetch = <T>(
  apiPath: string | null,
  configuration?: SWRConfiguration
) => {
  const result = useSWR<T | undefined, { message: string }>(
    apiPath,
    fetcher,
    configuration
  );

  return result;
};
