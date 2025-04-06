import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const session = await getSession(context.request);
    if ((context.url.pathname.startsWith("/admin") || context.url.pathname.includes("/admin/")) && !session?.user) {
      return context.redirect("/");
    }
    return next()
  } catch (error) {
    console.error("Error retrieving session in middleware:", error);    
  }
  return next();
});