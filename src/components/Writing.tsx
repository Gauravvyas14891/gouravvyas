import { motion } from 'framer-motion'

const stack: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['Java', 'JavaScript', 'HTML', 'CSS'] },
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'React'] },
  { category: 'Backend', items: ['Node.js', 'Express.js'] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Terminal', 'MongoDB Compass', 'MongoDB Shell'] },
  { category: 'Learning', items: ['Artificial Intelligence', 'Data Science', 'Cybersecurity', 'MERN Stack', 'Software Architecture'] },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Writing() {
  // Repurposed as Tech Stack section (id kept as 'stack')
  return (
    <section id="stack" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Tech Stack</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16"
        >
          STACK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border border-gray-800 rounded-2xl p-6 bg-white/[0.015] backdrop-blur-sm hover:border-gray-700 transition-colors"
            >
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm text-gray-300 border border-gray-800 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
