import { motion } from 'motion/react';

export function Hero({ onSearch, onNavigate }: { onSearch: (term: string) => void, onNavigate?: () => void }) {
  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden py-24 md:py-32 lg:py-40">
      {/* 사용자가 업로드할 첨부 이미지 (public/hero-bg.png) */}
      {/* 크기를 줄여 인물이 잘 식별되도록 설정하고 하단/우측 경계는 그라데이션으로 자연스럽게 블렌딩 */}
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-no-repeat bg-[length:130%] sm:bg-[length:70%] lg:bg-[length:60%] bg-[position:center_top] sm:bg-[position:-5vw_top] opacity-70 sm:opacity-100" />
      
      {/* 이미지가 자연스럽게 어울리도록 그라데이션 오버레이 추가: 모바일은 아래쪽, 데스크탑은 오른쪽으로 갈수록 어두워짐 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/80 to-slate-900 sm:bg-gradient-to-r sm:from-transparent sm:via-slate-900/80 sm:to-slate-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center sm:items-end text-center sm:text-right">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium tracking-wider mb-6 border border-blue-400/30 backdrop-blur-sm">
            시민들이 제안한 남양주의 미래
          </span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          최현덕 남양주시장 당선인과<br className="hidden sm:block" /> 함께 만드는 미래
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10 text-shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          더 나은 남양주를 위한 미래, 시민과 함께 만들어가겠습니다.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-xl md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#core-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg shadow-blue-900/20 backdrop-blur-sm"
          >
            핵심 비전
          </a>
          <a
            href="#regional-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20 backdrop-blur-sm"
          >
            지역별 약속
          </a>
          <a
            href="#detailed-pledges"
            onClick={() => onNavigate?.()}
            className="w-full py-4 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center transition-colors border border-slate-700 backdrop-blur-sm"
          >
            세부 약속
          </a>
        </motion.div>
      </div>
    </section>
  );
}
