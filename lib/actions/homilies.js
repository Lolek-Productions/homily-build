'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Get all homilies for a user with pagination and filtering
export async function getHomilies(userId, { page = 1, pageSize = 10, search = '', sortBy = 'created_at', sortOrder = 'desc' } = {}) {
  try {
    const supabase = await createClient();
    
    let query = supabase
      .from('homilies')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      count: count || 0,
      totalPages: Math.ceil((count || 0) / pageSize),
      currentPage: page,
      error: null
    };
  } catch (error) {
    console.error('Error getting homilies:', error);
    return { data: [], count: 0, totalPages: 0, currentPage: 1, error: error.message };
  }
}

// Get a single homily by ID
export async function getHomily(id, userId) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('homilies')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error getting homily:', error);
    return { data: null, error: error.message };
  }
}

// Create a new homily
export async function createHomily(userId, homily) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('homilies')
      .insert({
        user_id: userId,
        title: homily.title,
        description: homily.description || null,
        definitions: homily.definitions || null,
        rough_draft: homily.rough_draft || null,
        second_draft: homily.second_draft || null,
        final_draft: homily.final_draft || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    revalidatePath('/homilies');
    return { data, error: null };
  } catch (error) {
    console.error('Error creating homily:', error);
    return { data: null, error: error.message };
  }
}

// Update an existing homily
export async function updateHomily(id, userId, updates) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('homilies')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    revalidatePath('/homilies');
    revalidatePath(`/homilies/${id}`);
    return { data, error: null };
  } catch (error) {
    console.error('Error updating homily:', error);
    return { data: null, error: error.message };
  }
}

// Delete a homily
export async function deleteHomily(id, userId) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('homilies')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    revalidatePath('/homilies');
    return { error: null };
  } catch (error) {
    console.error('Error deleting homily:', error);
    return { error: error.message };
  }
}
