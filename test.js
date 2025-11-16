import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nftetzvanfgnndclfwkc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdGV0enZhbmZnbm5kY2xmd2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTkzNjQsImV4cCI6MjA3ODUzNTM2NH0.UN_Sonr7ZrgEpynWIAfxTn35qwmh_KQdCslBTPckf5U';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testConnection = async () => {
  const { data, error } = await supabase.from('patients').select('*');
  if (error) {
    console.error('❌ Connection failed:', error.message);
  } else {
    console.log('✅ Supabase connection successful:', data);
  }
};

testConnection();