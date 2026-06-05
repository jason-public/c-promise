import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pledgeCategories, PledgeCategory } from '../data/pledges';
import * as Icons from 'lucide-react';

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
}

export function CategoryDetail() {
  const [activeTab, setActiveTab] = useState(pledgeCategories[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCategory = pledgeCategories.find(c => c.id === activeTab) || pledgeCategories[0];

  return (
    <section className="py-20 bg-white" id="detailed-pledges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">분야별 세부 공약</h2>
          <p className="mt-4 text-lg text-slate-600">시민의 삶의 질을 높이는 구체적인 실천 방안</p>
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
                          ? 'bg-slate-900 text-white shadow-md' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                      `}
                    >
                      <Icon name={category.iconName} className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
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
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="bg-slate-50 px-8 py-10 border-b border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                      <Icon name={activeCategory.iconName} className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{activeCategory.title}</h3>
                  </div>
                  {activeCategory.subtitle && (
                    <p className="text-xl text-slate-600 font-medium">{activeCategory.subtitle}</p>
                  )}
                </div>
                
                <div className="p-8 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {activeCategory.subPledges.map((subPledge, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                          {subPledge.title}
                        </h4>
                        <ul className="space-y-3">
                          {subPledge.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start">
                              <Icon name="Check" className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                              <span className="text-slate-700 leading-relaxed text-sm sm:text-base">{item}</span>
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
