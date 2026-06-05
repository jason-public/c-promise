import { motion } from 'motion/react';

export function Hero({ onSearch, onNavigate }: { onSearch: (term: string) => void, onNavigate?: () => void }) {
  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517737282969-90600ddb0c03?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 MixBlendMode-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium tracking-wider mb-6 border border-blue-400/30">
            시민들이 제안한 남양주의 미래
          </span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          최현덕 남양주시장 당선인과<br className="hidden sm:block" /> 함께 만드는 미래
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          더 나은 남양주를 위한 미래, 시민과 함께 만들어가겠습니다.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-xl mx-auto md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#core-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg shadow-blue-900/20"
          >
            핵심 비전
          </a>
          <a
            href="#regional-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20"
          >
            지역별 약속
          </a>
          <a
            href="#detailed-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center transition-colors border border-slate-700"
          >
            세부 약속
          </a>
        </motion.div>
      </div>
    </section>
  );
}
