// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sgakgbzyxlkeimdrexiq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYWtnYnp5eGxrZWltZHJleGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTk3NTIsImV4cCI6MjA2ODg5NTc1Mn0.WTnn4JCDhT0sJDbXGgJRnksHAvh2HkL7ZVEkcMm96m0";

export const supabase = createClient(supabaseUrl, supabaseKey);
