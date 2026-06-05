import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { corePledges, SubPledge } from '../data/pledges';
import { X, Star, Volume2, Square } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { useTTS } from './TTSContext';

export function CorePledges() {
  const [selectedPledge, setSelectedPledge] = useState<SubPledge | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isSpeaking, currentTitle, toggleTTS } = useTTS();

  // Close modal on escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedPledge(null);
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300" id="core-pledges">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">핵심 미래 비전</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">남양주를 첨단산업과 문화가 공존하는 자족도시로 만듭니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corePledges.map((pledge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPledge(pledge)}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer hover:border-blue-200 dark:hover:border-blue-500 group relative"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPledge(pledge);
                }
              }}
            >
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = `${pledge.title}. ${pledge.items.join('. ')}`;
                    toggleTTS(pledge.title, text);
                  }}
                  className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                    isSpeaking && currentTitle === pledge.title
                      ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-slate-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  aria-label="음성 낭독 토글"
                >
                  {isSpeaking && currentTitle === pledge.title ? <Square className="w-5 h-5 fill-current" /> : <Volume2 className="w-5 h-5" />}
                </button>
                {isFavorite(pledge.title) && (
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-16">{pledge.title}</h3>
              <ul className="space-y-4">
                {pledge.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-slate-700 dark:text-slate-300">
                    <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPledge && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPledge(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden pointer-events-auto"
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
              >
                <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedPledge.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const text = `${selectedPledge.title}. ${selectedPledge.items.join('. ')}`;
                        toggleTTS(selectedPledge.title, text);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isSpeaking && currentTitle === selectedPledge.title
                          ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                          : 'text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      aria-label="음성 낭독 토글"
                    >
                      {isSpeaking && currentTitle === selectedPledge.title ? <Square className="w-6 h-6 fill-current" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedPledge)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(selectedPledge.title)
                          ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
                          : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      aria-label="관심 공약 토글"
                    >
                      <Star className={`w-6 h-6 ${isFavorite(selectedPledge.title) ? 'fill-yellow-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => setSelectedPledge(null)}
                      className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                      aria-label="닫기"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <ul className="space-y-4">
                    {selectedPledge.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-4">
                          <span className="text-blue-500 dark:text-blue-400 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg pt-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 flex justify-end border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setSelectedPledge(null)}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors font-medium"
                  >
                    확인
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
