export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
            <div className="w-auto px-1.5 h-6 bg-slate-800 rounded-md flex items-center justify-center shrink-0">
              <span className="text-slate-400 font-bold text-xs leading-none">남양주</span>
            </div>
            <span className="text-slate-300 font-semibold text-lg tracking-tight">시민과 함께 만들어가는 남양주의 미래</span>
          </div>
        </div>
        <div className="flex gap-4">
          <a href="https://m.blog.naver.com/hope4future2015/224291285970" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
            블로그 원문
          </a>
        </div>
      </div>
    </footer>
  );
}
