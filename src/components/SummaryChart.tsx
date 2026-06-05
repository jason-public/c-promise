import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';
import { pledgeCategories } from '../data/pledges';

export function SummaryChart() {
  const data = useMemo(() => {
    return pledgeCategories.map(cat => {
      // Split by '·' or ' ' to get a short name for the X axis
      const shortName = cat.title.split('·')[0].split(' ')[0].trim();
      return {
        name: shortName,
        fullName: cat.title,
        count: cat.subPledges.reduce((sum, sub) => sum + sub.items.length, 0),
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
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
