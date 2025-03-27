// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  integrations: [tailwind(), icon(), react()],
  adapter: vercel(),
  env: {
    schema: {
      SUPABASE_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SUPABASE_ANON_KEY: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
});
