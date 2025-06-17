import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                // Let Supabase handle auth cookie security settings
                // Don't override httpOnly as it may break client-side auth
              })
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
            console.error('Error setting cookies:', error);
          }
        },
      },
    }
  );
}

// Keep your nice helper function but make it use the standard client
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return { user: null, error };
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { 
      user: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
}

// Additional helper for getting user with parish data
export async function getCurrentUserWithParish() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { user: null, selectedParishId: null, error: authError };
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('selected_parish_id')
      .eq('user_id', user.id)
      .single();
    
    return { 
      user, 
      selectedParishId: profile?.selected_parish_id || null, 
      error: profileError 
    };
  } catch (error) {
    console.error('Error in getCurrentUserWithParish:', error);
    return { 
      user: null, 
      selectedParishId: null,
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
}