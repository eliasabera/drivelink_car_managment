import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://voynujkahgktofomefij.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveW51amthaGdrdG9mb21lZmlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTA1MDMsImV4cCI6MjA4MjUyNjUwM30.jP5pf83HYqFa7ZeyljEONccwj3QuQ4QGVw632zgCU2Q";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
