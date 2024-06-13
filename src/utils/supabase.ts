import { SupportedStorage, createClient } from '@supabase/supabase-js';
import { MMKV } from 'react-native-mmkv';
import { AppState } from 'react-native';

import Config from 'react-native-config';
import 'react-native-url-polyfill/auto';

const storage = new MMKV({ id: 'supabase-storage' });

const mmkvSupabaseSupportedStorage = {
  setItem: (key: any, data: any) => storage.set(key, data),
  getItem: (key: any) => storage.getString(key) ?? null,
  removeItem: (key: any) => storage.delete(key),
} satisfies SupportedStorage;

export const supabase = createClient(
  'https://ftcmfpajglzrijgdpegk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Y21mcGFqZ2x6cmlqZ2RwZWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMTMwMzgsImV4cCI6MjAzMzc4OTAzOH0.4m6BIL4UKQGZ_PIyKIUaf8oU9nZkDwsU0ESM49n1J7c',
  {
    auth: {
      storage: mmkvSupabaseSupportedStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
