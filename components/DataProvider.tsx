'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchSiteData } from '@/lib/api';

interface SiteData {
  siteConfig: any;
  portfolioSettings?: any;
  navItems: any[];
  socialLinks: any[];
  sections: any;
  projects: any[];
  experiences: any[];
  skills: any;
  highlights: any[];
  principles: any[];
}

interface DataContextType {
  data: SiteData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  data: null,
  isLoading: true,
  error: null,
  refetch: async () => {},
});

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

interface DataProviderProps {
  children: ReactNode;
  fallbackData?: SiteData;
}

export function DataProvider({ children, fallbackData }: DataProviderProps) {
  const [data, setData] = useState<SiteData | null>(fallbackData || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchSiteData();
      setData(response.data);
    } catch (err) {
      console.error('Failed to fetch site data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      
      // Use fallback data if API fails
      if (fallbackData) {
        setData(fallbackData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Refetch data when user returns to the tab (to get latest changes)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Tab is active, refetching data...');
        fetchData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        error,
        refetch: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}