const SUPABASE_URL =
"https://fbetpczzpwbutmgxmqqy.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZXRwY3p6cHdidXRtZ3htcXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjc4OTgsImV4cCI6MjA5NTcwMzg5OH0.4X5va5WwRTPN-HkWD4uHWBzR680NrTTNKCy4PwjNKak";

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
