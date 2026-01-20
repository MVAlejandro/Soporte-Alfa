import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Conexión a Supabase
const supabaseUrl = "https://duizjelnsktpjhkwjxma.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aXpqZWxuc2t0cGpoa3dqeG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MzU3NjcsImV4cCI6MjA3MzExMTc2N30.YDcVnisQWKSF3fudqXXIHs-KOdhh_MeHQx1ITHe6QIc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase