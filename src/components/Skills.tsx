import { motion } from 'framer-motion'

const technical = [
  'Frontend Development',
  'Backend Development',
  'REST APIs',
  'Responsive Web Design',
  'MongoDB Database Design',
  'Git Version Control',
  'Problem Solving',
]

const soft = [
  'Quick Learner',
  'Team Collaboration',
  'Communication',
  'Leadership',
  'Continuous Learning',
  'Analytical Thinking',
  'Creative Problem Solving',
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-gray-500 mb-8">{title}</p>
      <ul className="space-y-0">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="border-b border-gray-800 py-4 text-lg lg:text-xl text-gray-300 font-light"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Skills</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16"
        >
          SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <SkillColumn title="Technical" items={technical} />
          <SkillColumn title="Soft Skills" items={soft} />
        </div>
      </div>
    </section>
  )
}
