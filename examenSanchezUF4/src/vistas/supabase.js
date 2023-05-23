import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vasmfrmtilopmhtaygot.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhc21mcm10aWxvcG1odGF5Z290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4Mjk3NTcsImV4cCI6MjAwMDQwNTc1N30.Mwv6bRFzs59cI3Y6e5DPtBzxf4zlNxTzBxBRIsrrNzA'

// exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
