import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SubPledge } from '../data/pledges';

type FavoritesContextType = {
  favorites: SubPledge[];
  toggleFavorite: (pledge: SubPledge) => void;
  isFavorite: (title: string) => boolean;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<SubPledge[]>(() => {
    try {
      const stored = localStorage.getItem('pledge-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('pledge-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pledge: SubPledge) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.title === pledge.title);
      if (exists) {
        return prev.filter((p) => p.title !== pledge.title);
      }
      return [...prev, pledge];
    });
  };

  const isFavorite = (title: string) => {
    return favorites.some((p) => p.title === title);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
