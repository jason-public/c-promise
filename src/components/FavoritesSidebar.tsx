import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Trash2, Volume2, Square } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { useTheme } from './ThemeProvider';
import { useTTS } from './TTSContext';

export function FavoritesSidebar() {
  const { favorites, toggleFavorite, isSidebarOpen, setSidebarOpen } = useFavorites();
  const { theme } = useTheme();
  const { isSpeaking, currentTitle, toggleTTS } = useTTS();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                나의 관심 공약
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="사이드바 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">관심 있는 공약을 추가해보세요.</p>
                </div>
              ) : (
                favorites.map((pledge, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 relative group"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          const text = `${pledge.title}. ${pledge.items.join('. ')}`;
                          toggleTTS(pledge.title, text);
                        }}
                        className={`p-1.5 rounded-md transition-colors ${
                          isSpeaking && currentTitle === pledge.title
                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-slate-300 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title="음성 낭독 토글"
                      >
                        {isSpeaking && currentTitle === pledge.title ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleFavorite(pledge)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        title="관심 공약에서 제거"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 pr-16">
                      {pledge.title}
                    </h3>
                    <ul className="space-y-2">
                      {pledge.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2" />
                          <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
