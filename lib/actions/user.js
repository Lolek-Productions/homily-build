'use server';

import { getCurrentUser } from '@/lib/supabase/server';

export async function getUserSettings() {
  try {
    const { user, error: userError } = await getCurrentUser();
    
    if (userError || !user) {
      return { data: null, error: 'Not authenticated' };
    }

    return { 
      data: {
        userId: user.id
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Unexpected error in getUserSettings:', error);
    return { data: null, error: 'An unexpected error occurred' };
  }
}
