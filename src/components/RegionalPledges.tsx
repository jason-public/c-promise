import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { regionalPledges } from '../data/regionalPledges';
import { MapPin, Check, X, Volume2, Square } from 'lucide-react';
import { MapComponent } from './MapComponent';
import { useTTS } from './TTSContext';

export function RegionalPledges() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { isSpeaking, currentTitle, toggleTTS } = useTTS();

  const activeRegionData = selectedRegion ? regionalPledges.find(r => r.region === selectedRegion) : null;

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
            지역별 약속
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            지도의 지역을 선택하여 약속을 확인해보세요.
          </motion.p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Map Section */}
          <div className="w-full relative">
             <MapComponent selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
             
             {/* Region Details Popup */}
             <AnimatePresence>
               {selectedRegion && activeRegionData && (
                 <>
                   {/* Backdrop */}
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setSelectedRegion(null)}
                     className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-[900] rounded-2xl"
                   />
                   
                   {/* Modal */}
                   <motion.div
                     key={selectedRegion}
                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 20 }}
                     transition={{ duration: 0.2 }}
                     className="absolute inset-x-4 bottom-4 lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[600px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-700 z-[1000] max-h-[80vh] overflow-y-auto custom-scrollbar"
                   >
                   <button 
                     onClick={() => setSelectedRegion(null)}
                     className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full transition-colors"
                     aria-label="닫기"
                   >
                     <X className="w-5 h-5" />
                   </button>

                   <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 pr-8">
                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center shrink-0">
                       <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div className="flex items-center justify-between w-full">
                       <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                         {activeRegionData.region} 약속
                       </h3>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           const text = `${activeRegionData.region} 약속. ${activeRegionData.items.join('. ')}`;
                           toggleTTS(activeRegionData.region, text);
                         }}
                         className={`p-2 rounded-full transition-colors flex-shrink-0 mr-4 ${
                           isSpeaking && currentTitle === activeRegionData.region
                             ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                             : 'text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                         }`}
                         aria-label="음성 낭독 토글"
                       >
                         {isSpeaking && currentTitle === activeRegionData.region ? <Square className="w-6 h-6 fill-current" /> : <Volume2 className="w-6 h-6" />}
                       </button>
                     </div>
                   </div>

                   <ul className="space-y-3 sm:space-y-4">
                     {activeRegionData.items.map((item, idx) => (
                       <motion.li 
                         key={idx}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: idx * 0.05 }}
                         className="flex items-start bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                       >
                         <div className="mt-0.5 bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm shrink-0 mr-3 border border-slate-200 dark:border-slate-600">
                           <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                         </div>
                         <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed break-keep">
                           {item}
                         </span>
                       </motion.li>
                     ))}
                   </ul>
                 </motion.div>
                 </>
               )}
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
