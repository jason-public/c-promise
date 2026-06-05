import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { pledgeCategories, PledgeCategory } from '../data/pledges';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';

function Icon({ name, className }: { name: string; className?: string }) {
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
}

export function SummaryChart() {
  const [selectedCategory, setSelectedCategory] = useState<PledgeCategory | null>(null);

  // Close modal on escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedCategory(null);
    }
  };

  const data = useMemo(() => {
    return pledgeCategories.map(cat => {
      // Split by '·' or ' ' to get a short name for the X axis
      const shortName = cat.title.split('·')[0].split(' ')[0].trim();
      return {
        name: shortName,
        fullName: cat.title,
        count: cat.subPledges.reduce((sum, sub) => sum + sub.items.length, 0),
        originalCategory: cat
      };
    }).sort((a, b) => b.count - a.count);
  }, []);

  const COLORS = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#6366f1', // indigo-500
    '#f59e0b', // amber-500
    '#ec4899', // pink-500
    '#8b5cf6', // violet-500
    '#14b8a6', // teal-500
    '#f43f5e', // rose-500
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100" id="summary-chart">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">분야별 세부 공약 분포</h2>
          <p className="mt-4 text-lg text-slate-600">다양한 분야에서 약속한 구체적인 실천 과제의 수량입니다.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-slate-50 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200"
        >
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: -20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 13 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                  formatter={(value: number) => [`${value}개 과제`, '공약 수']}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      return <span className="font-bold text-slate-900">{payload[0].payload.fullName}</span>;
                    }
                    return label;
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={60}
                  onClick={(data: any) => {
                    if (data && data.payload && data.payload.originalCategory) {
                      setSelectedCategory(data.payload.originalCategory);
                    } else if (data && data.originalCategory) {
                      setSelectedCategory(data.originalCategory);
                    }
                  }}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedCategory && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCategory(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              />
              <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden pointer-events-auto flex flex-col"
                  role="dialog"
                  aria-modal="true"
                  tabIndex={-1}
                  onKeyDown={handleKeyDown}
                >
                  <div className="flex flex-shrink-0 items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Icon name={selectedCategory.iconName} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {selectedCategory.title}
                        </h3>
                        {selectedCategory.subtitle && (
                          <p className="text-slate-500 font-medium mt-1">
                            {selectedCategory.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors self-start"
                      aria-label="닫기"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-6 sm:p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      {selectedCategory.subPledges.map((subPledge, idx) => (
                        <div key={idx} className="space-y-4 relative">
                          <h4 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                            {subPledge.title}
                          </h4>
                          <ul className="space-y-3">
                            {subPledge.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start">
                                <Icon name="Check" className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                                <span className="text-slate-700 leading-relaxed text-sm sm:text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 flex justify-end border-t border-slate-100 flex-shrink-0">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                    >
                      닫기
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
