import { createClient } from '@/lib/supabase/client';

// Create initial user settings (for use during sign-up)
export async function createInitialUserSettings(userId, definitions) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_settings')
      .insert({ 
        user_id: userId,
        definitions: definitions,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { 
      data, 
      error: null 
    };
  } catch (error) {
    console.error('Error creating initial user settings:', error);
    return { data: null, error: error.message };
  }
}

// Get user's selected parish
export async function getUserSettings(userId) {
  try {
    const supabase = createClient();
    
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

export async function updateUserSettings(userId, updates) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ 
        id: userId,
        ...updates,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { 
      data, 
      error: null 
    };
  } catch (error) {
    console.error('Error updating user settings:', error);
    return { data: null, error: error.message };
  }
}
