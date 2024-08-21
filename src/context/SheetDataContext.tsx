// context/SheetDataContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type SheetData = {
  about: string[][];
  events: string[][];
  categories: string[][];
  sponsors: string[][];
  circles: string[][];
  team: string[][];
  speakersAndPerformers: string[][];
  home: string[][];
};

interface SheetDataContextProps {
  data: SheetData | null;
  loading: boolean;
  error: string | null;
}

const SheetDataContext = createContext<SheetDataContextProps | undefined>(undefined);

export const SheetDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSheetData`);
        const result: SheetData = await res.json();
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SheetDataContext.Provider value={{ data, loading, error }}>
      {children}
    </SheetDataContext.Provider>
  );
};

export const useSheetData = (): SheetDataContextProps => {
  const context = useContext(SheetDataContext);
  if (context === undefined) {
    throw new Error('useSheetData must be used within a SheetDataProvider');
  }
  return context;
};
