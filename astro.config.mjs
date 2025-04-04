// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

import auth from "auth-astro";

export default defineConfig({
  output: "server",
  integrations: [tailwind(), icon(), react(), auth()],
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