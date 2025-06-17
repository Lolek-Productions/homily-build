'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserSettings } from './user';

export async function getMinistries() {
  try {
    const { data: userSettings, error: userSettingsError } = await getUserSettings();
    const supabase = await createClient();
    
    if (userSettingsError || !userSettings) {
      return { data: [], error: userSettingsError || 'Failed to load user settings' };
    }

    const selectedParishId = userSettings.selectedParishId;

    // Build the query with selectedParishId included in the response
    let query = supabase
      .from('ministries')
      .select('*')
      .order('name', { ascending: true });

    // Add parish filter if selectedParishId exists
    if (selectedParishId) {
      query = query.eq('parish_id', selectedParishId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching ministries:', error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error in getMinistries:', error);
    return { data: [], error: error.message };
  }
}
