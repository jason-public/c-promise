import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pledgeCategories, PledgeCategory } from '../data/pledges';
import * as Icons from 'lucide-react';
import { useFavorites } from './FavoritesContext';

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
}

export function CategoryDetail() {
  const [activeTab, setActiveTab] = useState(pledgeCategories[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const activeCategory = pledgeCategories.find(c => c.id === activeTab) || pledgeCategories[0];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300" id="detailed-pledges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">분야별 세부 공약</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">시민의 삶의 질을 높이는 구체적인 실천 방안</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="sticky top-24 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              <nav className="flex lg:flex-col gap-2 min-w-max lg:min-w-0" aria-label="Tabs">
                {pledgeCategories.map((category) => {
                  const isActive = activeTab === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`
                        flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-xl transition-all text-left whitespace-nowrap lg:whitespace-normal
                        ${isActive 
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md' 
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}
                      `}
                    >
                      <Icon name={category.iconName} className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400 dark:text-blue-600' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="font-semibold text-sm sm:text-base">{category.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-10 border-b border-slate-200 dark:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Icon name={activeCategory.iconName} className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{activeCategory.title}</h3>
                  </div>
                  {activeCategory.subtitle && (
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">{activeCategory.subtitle}</p>
                  )}
                </div>
                
                <div className="p-8 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {activeCategory.subPledges.map((subPledge, idx) => (
                      <div key={idx} className="space-y-4 group">
                        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white pr-4">
                            {subPledge.title}
                          </h4>
                          <button
                            onClick={() => toggleFavorite(subPledge)}
                            className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                              isFavorite(subPledge.title)
                                ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                                : 'text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                            aria-label="관심 공약 토글"
                          >
                            <Icons.Star className={`w-5 h-5 ${isFavorite(subPledge.title) ? 'fill-yellow-400' : ''}`} />
                          </button>
                        </div>
                        <ul className="space-y-3">
                          {subPledge.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start">
                              <Icon name="Check" className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-3 shrink-0 mt-0.5" />
                              <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
