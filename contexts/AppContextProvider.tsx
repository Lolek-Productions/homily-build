'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { getUserSettings } from '@/lib/actions/userSettings';

interface UserSettings {
  id: string; // This is the user's UUID from auth.users
  created_at: string;
  definitions?: string | null;
}

interface AppContextProviderProps {
  children: ReactNode;
  // Optional: pass initial data from server to prevent hydration issues
  initialUser?: User | null;
  initialUserSettings?: UserSettings | null;
}

interface AppContextType {
  user: User | null;
  userSettings: UserSettings | null;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const AppContext = createContext<AppContextType>({
  user: null,
  userSettings: null,
  isLoading: true,
  refreshSettings: async () => {}
});

export const AppContextProvider = ({ 
  children, 
  initialUser = null, 
  initialUserSettings = null,
}: AppContextProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(initialUserSettings);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);

  // Create supabase client
  const supabase = createClient();

  // Function to refresh settings - wrapped in useCallback to prevent re-renders
  const refreshSettings = useCallback(async (): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await getUserSettings(user.id);
            
      if (error) {
        console.error('Failed to fetch user settings:', error);
        // If it's an auth error, set userSettings to null so dashboard can create defaults
        if (error.includes('Auth session missing')) {
          setUserSettings(null);
        }
        return;
      }
      
      // Ensure we have a complete UserSettings object
      const completeUserSettings: UserSettings | null = data ? {
        id: (data as any).id || '',
        created_at: (data as any).created_at || null,
        definitions: (data as any).definitions || null,
      } : null;
      
      setUserSettings(completeUserSettings);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user settings:', error);
      // If it's an auth error, set userSettings to null so dashboard can create defaults
      if (error instanceof Error && error.message.includes('Auth session missing')) {
        setUserSettings(null);
      }
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
              id: (data as any).id || '',
              definitions: (data as any).definitions || null,
              created_at: (data as any).created_at || null,
            } : null;
            
            setUserSettings(completeUserSettings);
          } else if (error) {
            console.error('Failed to fetch user settings on auth change:', error);
            // Set to null so dashboard can create defaults if needed
            setUserSettings(null);
          } else {
            // No data returned, user has no settings yet
            setUserSettings(null);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch user settings on auth change:', error);
          // Set to null so dashboard can create defaults if needed
          setUserSettings(null);
          setIsLoading(false);
        }
      } else {
        setUserSettings(null);
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

  return (
    <AppContext.Provider 
      value={{
        user,
        userSettings,
        isLoading,
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
