import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://mramioidvcyrixesbzgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yYW1pb2lkdmN5cml4ZXNiemdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzU0NDksImV4cCI6MjA3ODgxMTQ0OX0.M4VLhAdLJikNWTvlobQK4Ye-prDqB8SpYJRgV4g-bro"
);
