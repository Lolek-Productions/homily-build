'use client';

import { AppContextProvider } from '@/contexts/AppContextProvider';

export default function AppProviderWrapper({ children }) {
  return (
    <AppContextProvider>
      {children}
    </AppContextProvider>
  );
}
