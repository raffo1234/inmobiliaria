import type { AstroGlobal } from 'astro';
import type { Session } from '@auth/core/types';
import { getSession } from 'auth-astro/server';
import { supabase } from './supabase';


interface SyncResult {
  success: boolean;
  message: string;
  user?: Session['user'] | null; 
  error?: unknown; 
}

export async function syncUserWithDb(Astro: AstroGlobal): Promise<SyncResult | null> {
  const session: Session | null = await getSession(Astro.request);
  
  if (!session?.user) {
    console.log('syncUserWithDb: No active session found.');
    return null;
  }
 
  const { name, email, image, id: providerId } = session.user;

  if (!email) {
    console.error('syncUserWithDb: User email not found in session.');
    return { success: false, message: 'User email missing in session.', user: session.user };
  }
  
  try {
    console.info(`syncUserWithDb: Checking/syncing user ${email}...`);

    const { data: existingUser, error } = await supabase
    .from("user")
    .select()
    .eq("email", email).single();
    
    if (!existingUser) {
      
      try {
      const { data: createdUser, error: errorSupabase } = await supabase.from("user").insert([{
        email,
        name,
        username: email,
        image_url: image
      }]).select().single();

      
        console.info(`syncUserWithDb: User ${createdUser.email} created successfully.`);
      } catch (error) {
        console.error('syncUserWithDb: Error creating user:', error);
        return { success: false, message: 'User creation failed.', user: session.user, error: error };
      }
      
      return { success: true, message: 'User created successfully.', user: session.user };
    } else {
      console.log(`syncUserWithDb: User ${email} already exists.`);
      return { success: true, message: 'User already exists.', user: session.user };
    }
  } catch (error) {
    console.error('syncUserWithDb: Error syncing user:', error);
    return { success: false, message: 'Database operation failed.', user: session.user, error: error };
  }
}
