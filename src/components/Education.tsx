import { motion } from 'framer-motion'
import { useContentBlock } from '@/hooks/useSiteData'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Education() {
  const { data: content } = useContentBlock('education')

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">{content.eyebrow}</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16 lg:mb-20"
        >
          {content.title}
        </motion.h2>

        <div className="space-y-5">
          {content.items.map((edu, i) => (
            <motion.div
              key={edu.degree + edu.institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border border-gray-800 rounded-2xl p-6 lg:p-10 bg-white/[0.015] hover:border-gray-700 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <span className="text-xs tracking-widest uppercase text-gray-500">
                    0{i + 1}
                  </span>
                  {edu.status && (
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase rounded-full border border-gray-700 text-gray-400">
                      {edu.status}
                    </span>
                  )}
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-2xl lg:text-3xl text-white font-light mb-2">
                    {edu.degree}
                  </h3>
                  {edu.field && (
                    <p className="text-base lg:text-lg text-gray-300 mb-1">{edu.field}</p>
                  )}
                  <p className="text-sm lg:text-base text-gray-500">{edu.institution}</p>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <span className="text-sm text-gray-400 tabular-nums tracking-wider">
                    {edu.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
