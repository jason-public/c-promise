import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { regionalPledges } from '../data/regionalPledges';
import { MapPin, Check } from 'lucide-react';

export function RegionalPledges() {
  const [selectedRegion, setSelectedRegion] = useState(regionalPledges[0].region);

  const activeRegionData = regionalPledges.find(r => r.region === selectedRegion) || regionalPledges[0];

  return (
    <section id="regional-pledges" className="py-24 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            지역별 공약
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            남양주시 각 지역의 특성에 맞는 맞춤형 발전을 약속합니다.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Region Selector (Sidebar on Desktop, Select/Grid on Mobile) */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-28 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                지역 선택
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {regionalPledges.map((region) => (
                  <button
                    key={region.region}
                    onClick={() => setSelectedRegion(region.region)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all text-left ${
                      selectedRegion === region.region
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {region.region}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Region Details */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {activeRegionData.region} 공약
                  </h3>
                </div>

                <ul className="space-y-4 sm:space-y-6">
                  {activeRegionData.items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                    >
                      <div className="mt-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm shrink-0 mr-4 border border-slate-100 dark:border-slate-700">
                        <Check className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed break-keep pt-0.5">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}</style>
    </section>
  );
}
