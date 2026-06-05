import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Moon, Sun, Star, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useFavorites } from './FavoritesContext';

export function Navigation() {
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const { setSidebarOpen, favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.95)'] // slate-900 with opacity
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(8px)']
  );

  return (
    <>
      <motion.header
        style={{ backgroundColor, backdropFilter }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">남</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">당선인 공약집</span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden md:flex gap-8 mr-2">
                <a href="#core-pledges" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  핵심 미래 비전
                </a>
                <a href="#detailed-pledges" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  분야별 세부 공약
                </a>
              </nav>
              
              <button
                onClick={() => setSidebarOpen(true)}
                className="relative p-2 text-slate-300 hover:text-yellow-400 transition-colors rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                aria-label="관심 공약 열기"
              >
                <Star className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <a 
                href="#core-pledges" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white transition-colors block py-2"
              >
                핵심 미래 비전
              </a>
              <a 
                href="#detailed-pledges" 
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white transition-colors block py-2"
              >
                분야별 세부 공약
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
