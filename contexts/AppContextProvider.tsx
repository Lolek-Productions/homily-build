'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { getUserSettings, updateSelectedParish } from '@/lib/actions/userSettings';
import { getParishById } from '@/lib/actions/parish';

interface UserSettings {
  id: string;
  selected_parish_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface Parish {
  id: number;
  name: string;
  created_at: string;
}

interface AppContextProviderProps {
  children: ReactNode;
  // Optional: pass initial data from server to prevent hydration issues
  initialUser?: User | null;
  initialUserSettings?: UserSettings | null;
  initialParish?: Parish | null;
}

interface AppContextType {
  user: User | null;
  userSettings: UserSettings | null;
  selectedParishId: string | null; // Keep for backward compatibility
  selectedParish: Parish | null; // Parish details
  isLoading: boolean;
  updateParish: (parishId: string | null) => Promise<{ error: string | null }>;
  refreshSettings: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  user: null,
  userSettings: null,
  selectedParishId: null,
  selectedParish: null,
  isLoading: true,
  updateParish: async () => ({ error: 'Context not initialized' }),
  refreshSettings: async () => {}
});

export const AppContextProvider = ({ 
  children, 
  initialUser = null, 
  initialUserSettings = null,
  initialParish = null
}: AppContextProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(initialUserSettings);
  const [selectedParishId, setSelectedParishId] = useState<string | null>(null);
  const [selectedParish, setSelectedParish] = useState<Parish | null>(initialParish);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);

  // Create supabase client
  const supabase = createClient();

  // Function to refresh settings - wrapped in useCallback to prevent re-renders
  const refreshSettings = useCallback(async (): Promise<void> => {
    if (!user) {
      setSelectedParishId(null);
      setUserSettings(null);
      setSelectedParish(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await getUserSettings(user.id);
            
      if (error) {
        console.error('Failed to fetch user settings:', error);
        return;
      }
      
      // Ensure we have a complete UserSettings object
      const completeUserSettings: UserSettings | null = data ? {
        id: (data as any).id || user.id,
        selected_parish_id: (data as any).selected_parish_id || null,
        created_at: (data as any).created_at || null,
        updated_at: (data as any).updated_at || null
      } : null;
      
      setUserSettings(completeUserSettings);
      
      // Fetch parish details if selected parish ID exists
      if (completeUserSettings?.selected_parish_id) {
        const { data: parishData, error: parishError } = await getParishById(completeUserSettings.selected_parish_id);
        if (!parishError && parishData) {
          setSelectedParish(parishData);
        } else {
          setSelectedParish(null);
        }
      } else {
        setSelectedParish(null);
      }
    } catch (error) {
      console.error('Failed to fetch user settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Set up auth state listener
  useEffect(() => {
    // Only set up auth listener if we don't have initial user data
    // or if we need to listen for changes
    const setupAuth = async () => {
      // Get initial user if not provided
      if (!initialUser) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        if (currentUser && !initialUserSettings) {
          // Only fetch settings if we don't have initial data
          // Note: refreshSettings will be called via the user state change
        } else if (!currentUser) {
          setIsLoading(false);
        }
      } else {
        // We have initial user, make sure it's set in state
        setUser(initialUser);
        if (!initialUserSettings) {
          // We have initial user but no settings data
          // Note: refreshSettings will be called via the user state change
        } else {
          // We have both initial user and settings data
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        // Fetch fresh settings when user logs in
        try {
          setIsLoading(true);
          const { data, error } = await getUserSettings(newUser.id);
          
          if (!error && data) {
            // Ensure we have a complete UserSettings object
            const completeUserSettings: UserSettings | null = data ? {
              id: (data as any).id || newUser.id,
              selected_parish_id: (data as any).selected_parish_id || null,
              created_at: (data as any).created_at || null,
              updated_at: (data as any).updated_at || null
            } : null;
            
            setUserSettings(completeUserSettings);
            
            // Fetch parish details if selected parish ID exists
            if (completeUserSettings?.selected_parish_id) {
              const { data: parishData, error: parishError } = await getParishById(completeUserSettings.selected_parish_id);
              if (!parishError && parishData) {
                setSelectedParish(parishData);
              } else {
                setSelectedParish(null);
              }
            } else {
              setSelectedParish(null);
            }
          }
        } catch (error) {
          console.error('Failed to fetch user settings on auth change:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserSettings(null);
        setSelectedParish(null);
        setIsLoading(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, initialUser, initialUserSettings]);

  useEffect(() => {
    if (user && !userSettings && !initialUserSettings) {
      refreshSettings();
    }
  }, [user, userSettings, initialUserSettings]);

  // Function to update the selected parish
  const updateParish = useCallback(async (parishId: string | null): Promise<{ error: string | null }> => {
    if (!user) return { error: 'User not authenticated' };
    
    try {
      const { error } = await updateSelectedParish(user.id, parishId);
      if (error) throw error;
      
      // Update the userSettings state with the new parish
      setUserSettings(prev => prev ? {
        ...prev,
        selected_parish_id: parishId,
        updated_at: new Date().toISOString()
      } : {
        id: user.id,
        selected_parish_id: parishId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      if (parishId) {
        const { data: parishData, error: parishError } = await getParishById(parishId);
        if (!parishError && parishData) {
          setSelectedParish(parishData);
        } else {
          setSelectedParish(null);
        }
      } else {
        setSelectedParish(null);
      }
      
      return { error: null };
    } catch (error) {
      console.error('Failed to update parish:', error);
      return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  }, [user]);

  return (
    <AppContext.Provider 
      value={{
        user,
        userSettings,
        selectedParishId: userSettings?.selected_parish_id || null, // Backward compatibility
        selectedParish,
        isLoading,
        updateParish,
        refreshSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
