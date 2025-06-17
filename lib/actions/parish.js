import { createClient } from '@/lib/supabase/client';

// Get parish details by ID
export async function getParishById(parishId) {
  if (!parishId) {
    return { data: null, error: null };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('parishes')
      .select('*')
      .eq('id', parishId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return { 
      data: data || null, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting parish:', error);
    return { data: null, error: error.message };
  }
}

// Get all parishes
export async function getAllParishes() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('parishes')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return { 
      data: data || [], 
      error: null 
    };
  } catch (error) {
    console.error('Error getting parishes:', error);
    return { data: [], error: error.message };
  }
}
