'use server';

import { createClient, getCurrentUser } from '@/lib/supabase/server';

export async function getUserSettings() {
  try {
    const { user, error: userError } = await getCurrentUser();
    const supabase = await createClient();
    
    if (userError || !user) {
      return { data: null, error: 'Not authenticated' };
    }

    const { data: userSettings, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (settingsError && settingsError.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
      console.error('Error fetching user settings:', settingsError);
      return { data: null, error: settingsError.message };
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
