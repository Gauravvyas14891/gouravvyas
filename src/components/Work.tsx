import { motion } from 'framer-motion'
import { useContentBlock } from '@/hooks/useSiteData'


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' },
}

export function Work() {
  const { data: content } = useContentBlock('projects')

  return (
    <section id="projects" className="section-padding bg-[#0a0a0a]">
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

        <div className="space-y-6">
          {content.projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border border-gray-800 rounded-2xl p-6 lg:p-10 bg-white/[0.015] hover:border-gray-700 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs tracking-widest uppercase text-gray-500">
                      0{i + 1}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase rounded-full border border-gray-700 text-gray-400">
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display tracking-tight text-white">
                    {p.name}
                  </h3>
                  <p className="mt-4 text-sm lg:text-base text-gray-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Features</p>
                  <ul className="space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="text-sm text-gray-300 flex gap-3 leading-relaxed"
                      >
                        <span className="text-gray-600 mt-1">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Tech</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs text-gray-400 border border-gray-800 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
