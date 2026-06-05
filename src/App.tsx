/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation, Hero, CorePledges, CategoryDetail, Footer, SearchBar, SearchResults, SummaryChart, ThemeProvider, FavoritesProvider, FavoritesSidebar } from '@/src/components';
import { motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[100]" 
            style={{ scaleX }} 
          />
          
          <Navigation />
          <FavoritesSidebar />
          
          <main>
            <Hero />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {searchTerm ? (
              <SearchResults searchTerm={searchTerm} />
            ) : (
              <>
                <CorePledges />
                <SummaryChart />
                <CategoryDetail />
              </>
            )}
          </main>

          <Footer />
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
