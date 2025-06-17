'use server';

import { createClient } from '@/lib/supabase/server';

// Get user's selected parish
export async function getUserSettings(userId) {
  try {
    const supabase = await createClient(); // Add await here!
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return { 
      data: data || null, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    return { data: null, error: error.message };
  }
}
