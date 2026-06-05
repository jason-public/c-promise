import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Navigation() {
  const { scrollY } = useScroll();
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
            <span className="text-white font-bold text-xl tracking-tight">남양주 공약집</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <a href="#core-pledges" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              핵심 미래 비전
            </a>
            <a href="#detailed-pledges" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              분야별 세부 공약
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
