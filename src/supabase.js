import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log(
  "URL:",
  import.meta.env.VITE_SUPABASE_URL,
  "KEY:",
  import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10)
);

// Project URL: https://yvanqtxtgxcowumzrvcp.supabase.co
// API key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YW5xdHh0Z3hjb3d1bXpydmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTU1NjEsImV4cCI6MjA3ODIzMTU2MX0.eB3n90an_bO9TjaPh0tv0hqA_JJN1RgZjbAkaVx8FQc
