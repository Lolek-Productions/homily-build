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
  refreshSettings: () => Promise<UserSettings | null>;
}

const AppContext = createContext<AppContextType>({
  user: null,
  userSettings: null,
  isLoading: true,
  refreshSettings: async () => null
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
  const refreshSettings = useCallback(async (): Promise<UserSettings | null> => {
    const currentUser = user;
    if (!currentUser) {
      console.log('No user found, cannot refresh settings');
      return null;
    }
    
    console.log(`Refreshing settings for user ${currentUser.id}`);
    setIsLoading(true);
    
    try {
      const { data, error } = await getUserSettings(currentUser.id);
            
      if (error) {
        console.error('Failed to fetch user settings:', error);
        // If it's an auth error, set userSettings to null so dashboard can create defaults
        if (typeof error === 'string' && error.includes('Auth session missing')) {
          setUserSettings(null);
        }
        setIsLoading(false);
        return null;
      }
      
      // Ensure we have a complete UserSettings object
      const completeUserSettings: UserSettings | null = data ? {
        id: (data as any).id || '',
        created_at: (data as any).created_at || null,
        definitions: (data as any).definitions || null,
      } : null;
      
      console.log('User settings refreshed successfully:', completeUserSettings);
      setUserSettings(completeUserSettings);
      setIsLoading(false);
      return completeUserSettings;
    } catch (error) {
      console.error('Failed to fetch user settings:', error);
      // If it's an auth error, set userSettings to null so dashboard can create defaults
      if (error instanceof Error && error.message.includes('Auth session missing')) {
        setUserSettings(null);
      }
      setIsLoading(false);
      return null;
    }
  }, [user]);

  // Load settings when user changes and we don't have initial settings
  useEffect(() => {
    if (user && !userSettings && !initialUserSettings) {
      console.log('User changed, loading settings...');
      refreshSettings();
    } else if (!user) {
      // User logged out, clear settings
      setUserSettings(null);
      setIsLoading(false);
    } else if (user && initialUserSettings) {
      // We have initial settings, stop loading
      setIsLoading(false);
    }
  }, [user, initialUserSettings]); // Removed userSettings and refreshSettings from deps to avoid cycles

  // Set up auth state listener
  useEffect(() => {
    const setupAuth = async () => {
      // Get initial user if not provided
      if (!initialUser) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        console.log('Initial user fetch:', currentUser);
        setUser(currentUser);
        
        if (!currentUser) {
          setIsLoading(false);
        }
      } else {
        // We have initial user data
        console.log('Using initial user:', initialUser);
        setUser(initialUser);
        
        if (initialUserSettings) {
          // We have both user and settings
          setIsLoading(false);
        }
        // If we don't have initial settings, the other useEffect will handle loading them
      }
    };

    setupAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      if (!newUser) {
        // User logged out
        setUserSettings(null);
        setIsLoading(false);
      }
      // If user logged in, the useEffect above will handle loading settings
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array to avoid re-running

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