"use server";

import { createClient } from '@/lib/supabase/server';

// Server action to get user settings
export async function getUserSettingsServer(userId) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    // Use the server-side Supabase client that handles authentication properly
    const supabase = await createClient();
    
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
    console.error('Error getting user settings from server:', error);
    return { data: null, error: error.message };
  }
}
