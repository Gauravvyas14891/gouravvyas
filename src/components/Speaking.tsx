import { motion } from 'framer-motion'
import { useContentBlock } from '@/hooks/useSiteData'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Speaking() {
  // Repurposed: Now / Goals + Open Source note (id kept as 'goals')
  const { data: content } = useContentBlock('goals')

  return (
    <section id="goals" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">{content.eyebrow}</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16"
        >
          {content.title}<br />
          <span className="text-gray-500">{content.mutedTitle}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              {content.currentTitle}
            </p>
            <ul className="space-y-3">
              {content.current.map((item) => (
                <li key={item} className="text-base lg:text-lg text-gray-300 flex gap-3">
                  <span className="text-gray-600">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp}>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6">
              {content.goalsTitle}
            </p>
            <ul className="space-y-3">
              {content.goals.map((item) => (
                <li key={item} className="text-base lg:text-lg text-gray-300 flex gap-3">
                  <span className="text-gray-600">◇</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          {...fadeInUp}
          className="border border-gray-800 rounded-2xl p-8 lg:p-10 bg-white/[0.015]"
        >
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">{content.noteTitle}</p>
          <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
            {content.note}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
