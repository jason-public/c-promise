import { motion } from 'motion/react';
import { corePledges } from '../data/pledges';

export function CorePledges() {
  return (
    <section className="py-20 bg-slate-50" id="core-pledges">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">핵심 미래 비전</h2>
          <p className="mt-4 text-lg text-slate-600">남양주를 첨단산업과 문화가 공존하는 자족도시로 만듭니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corePledges.map((pledge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">{pledge.title}</h3>
              <ul className="space-y-4">
                {pledge.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-slate-700">
                    <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
