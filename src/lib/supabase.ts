import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "astro:env/client";

export const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_ANON_KEY as string,
);
