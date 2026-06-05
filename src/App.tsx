/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation, Hero, CorePledges, CategoryDetail, Footer, SearchBar, SearchResults, SummaryChart } from '@/src/components';
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
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[100]" 
        style={{ scaleX }} 
      />
      
      <Navigation />
      
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
  );
}
