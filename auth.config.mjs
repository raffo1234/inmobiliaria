import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";
import syncUserWithDatabase from "@lib/syncUserWithDatabase";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      console.log("auth-astro signIn callback triggered", { user });

      if (user && profile) {
        await syncUserWithDatabase(user, profile);
      }

      return true;
    },

    async session({ session }) {
      return session;
    },
  },
});
