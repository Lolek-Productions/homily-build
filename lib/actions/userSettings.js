import { createClient } from '@/lib/supabase/client';

// Create initial user settings (for use during sign-up)
export async function createInitialUserSettings(userId, definitions) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_settings')
      .insert({ 
        id: userId, // Use id, not user_id based on schema
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

// Get user settings by user ID
export async function getUserSettings(userId) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('id', userId) // Correct: id is the primary key that references auth.users(id)
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
        id: userId, // Use id as primary key
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
