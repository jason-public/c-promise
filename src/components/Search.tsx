import { useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { corePledges, pledgeCategories, SubPledge, PledgeCategory } from '../data/pledges';
import * as Icons from 'lucide-react';
import { useFavorites } from './FavoritesContext';

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
}

const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? 
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/30 text-slate-900 dark:text-yellow-100 rounded-sm px-0.5 font-semibold mx-px">{part}</mark> : part
      )}
    </span>
  );
};

export function SearchBar({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) {
  return (
    <section className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-12 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-2xl leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:text-white transition-all sm:text-lg outline-none"
            placeholder="관심있는 공약 키워드를 검색해보세요 (예: 교통, 청년, 복지)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              onClick={() => setSearchTerm('')}
              aria-label="검색어 지우기"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function SearchResults({ searchTerm }: { searchTerm: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isSpeaking, currentTitle, toggleTTS } = useTTS();

  const results = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return { core: [], categories: [] as PledgeCategory[] };

    const matchedCore = corePledges.map(p => {
        if (p.title.toLowerCase().includes(term)) return p;
        const matchedItems = p.items.filter(i => i.toLowerCase().includes(term));
        if (matchedItems.length > 0) return { ...p, items: matchedItems };
        return null;
    }).filter(Boolean) as SubPledge[];

    const matchedCats = pledgeCategories.map(cat => {
      if (cat.title.toLowerCase().includes(term) || (cat.subtitle && cat.subtitle.toLowerCase().includes(term))) {
         return cat;
      }
      
      const matchedSub = cat.subPledges.map(sub => {
         if (sub.title.toLowerCase().includes(term)) return sub;
         const matchedItems = sub.items.filter(i => i.toLowerCase().includes(term));
         if (matchedItems.length > 0) return { ...sub, items: matchedItems };
         return null;
      }).filter(Boolean) as SubPledge[];

      if (matchedSub.length > 0) {
        return { ...cat, subPledges: matchedSub };
      }
      return null;
    }).filter(Boolean) as PledgeCategory[];

    return { core: matchedCore, categories: matchedCats };
  }, [searchTerm]);

  const hasResults = results.core.length > 0 || results.categories.length > 0;

  if (!hasResults) {
    return (
      <section className="py-24 bg-slate-50 dark:bg-slate-900 min-h-[50vh] flex flex-col items-center justify-center transition-colors duration-300">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <SearchIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">"{searchTerm}"에 대한 공약을 찾을 수 없습니다.</p>
        <p className="text-slate-400 dark:text-slate-500 mt-2">다른 키워드로 검색해보세요.</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 min-h-[50vh] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-10 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 inline-block px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="font-bold text-blue-600 dark:text-blue-400">"{searchTerm}"</span> 검색 결과
        </div>
        
        <div className="space-y-12">
          {results.core.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
                핵심 미래 비전
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.core.map((pledge, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500 transition-colors group relative">
                    <div className="absolute top-4 right-4 flex items-center gap-1">
                      <button
                        onClick={() => {
                          const text = `${pledge.title}. ${pledge.items.join('. ')}`;
                          toggleTTS(pledge.title, text);
                        }}
                        className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                          isSpeaking && currentTitle === pledge.title
                            ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        aria-label="음성 낭독 토글"
                      >
                        {isSpeaking && currentTitle === pledge.title ? <Icons.Square className="w-5 h-5 fill-current" /> : <Icons.Volume2 className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => toggleFavorite(pledge)}
                        className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
                          isFavorite(pledge.title)
                            ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                            : 'text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        aria-label="관심 공약 토글"
                      >
                        <Icons.Star className={`w-5 h-5 ${isFavorite(pledge.title) ? 'fill-yellow-400' : ''}`} />
                      </button>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pr-16">
                      <Highlight text={pledge.title} highlight={searchTerm} />
                    </h4>
                    <ul className="space-y-3">
                      {pledge.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start text-slate-700 dark:text-slate-300">
                          <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                          <span className="leading-relaxed">
                            <Highlight text={item} highlight={searchTerm} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {results.categories.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                분야별 세부 공약
              </h3>
              {results.categories.map((cat) => (
                <motion.div 
                  key={cat.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl">
                      <Icon name={cat.iconName} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        <Highlight text={cat.title} highlight={searchTerm} />
                      </h4>
                      {cat.subtitle && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          <Highlight text={cat.subtitle} highlight={searchTerm} />
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cat.subPledges.map((sub, idx) => (
                      <div key={idx} className="group relative">
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="font-semibold text-slate-900 dark:text-white pr-4">
                            <Highlight text={sub.title} highlight={searchTerm} />
                          </h5>
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => {
                                const text = `${sub.title}. ${sub.items.join('. ')}`;
                                toggleTTS(sub.title, text);
                              }}
                              className={`p-1.5 -mt-1 rounded-full transition-colors flex-shrink-0 ${
                                isSpeaking && currentTitle === sub.title
                                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                              aria-label="음성 낭독 토글"
                            >
                              {isSpeaking && currentTitle === sub.title ? <Icons.Square className="w-4 h-4 fill-current" /> : <Icons.Volume2 className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => toggleFavorite(sub)}
                              className={`p-1.5 -mt-1 -mr-1 rounded-full transition-colors flex-shrink-0 ${
                                isFavorite(sub.title)
                                  ? 'text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                                  : 'text-slate-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                              aria-label="관심 공약 토글"
                            >
                              <Icons.Star className={`w-4 h-4 ${isFavorite(sub.title) ? 'fill-yellow-400' : ''}`} />
                            </button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {sub.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start">
                              <Icon name="Check" className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-1" />
                              <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                <Highlight text={item} highlight={searchTerm} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
