import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "astro:env/client";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL || (SUPABASE_URL as string),
  import.meta.env.SUPABASE_ANON_KEY || (SUPABASE_ANON_KEY as string),
);
