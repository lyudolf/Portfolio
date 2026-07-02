import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* env 미설정 시 앱 전체가 크래시하지 않도록 null 폴백.
   (InterestModal에서 supabase가 null이면 제출 실패 메시지로 처리) */
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
