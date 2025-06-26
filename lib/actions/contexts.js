'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Get all contexts for a user
export async function getContexts(userId) {
  if (!userId) {
    console.error('getContexts called with no userId');
    return { data: [], count: 0, error: 'No user ID provided' };
  }

  console.log('Getting contexts for user:', userId);
  
  try {
    const supabase = await createClient();
    
    const { data, error, count } = await supabase
      .from('contexts')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error getting contexts:', error);
      throw error;
    }

    console.log(`Found ${data?.length || 0} contexts for user ${userId}`);
    
    return {
      data: data || [],
      count: count || 0,
      error: null
    };
  } catch (error) {
    console.error('Error getting contexts:', error);
    return { data: [], count: 0, error: error.message };
  }
}

// Get a single context by ID
export async function getContext(id, userId) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('contexts')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error getting context:', error);
    return { data: null, error: error.message };
  }
}

// Create a new context
export async function createContext(userId, name, contextContent) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('contexts')
      .insert({
        user_id: userId,
        name: name,
        context: contextContent,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    revalidatePath('/contexts');
    return { data, error: null };
  } catch (error) {
    console.error('Error creating context:', error);
    return { data: null, error: error.message };
  }
}

// Update an existing context
export async function updateContext(id, userId, name, contextContent) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('contexts')
      .update({ 
        name: name,
        context: contextContent 
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    revalidatePath('/contexts');
    return { data, error: null };
  } catch (error) {
    console.error('Error updating context:', error);
    return { data: null, error: error.message };
  }
}

// Delete a context
export async function deleteContext(id, userId) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('contexts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    revalidatePath('/contexts');
    return { error: null };
  } catch (error) {
    console.error('Error deleting context:', error);
    return { error: error.message };
  }
}
