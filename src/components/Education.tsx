import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Education</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16"
        >
          EDUCATION
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="border border-gray-800 rounded-2xl p-8 lg:p-12 bg-white/[0.015]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Current</p>
              <p className="text-sm text-gray-400">Undergraduate</p>
            </div>
            <div className="lg:col-span-8">
              <h3 className="text-2xl lg:text-3xl text-white font-light mb-2">
                Bachelor of Technology
              </h3>
              <p className="text-lg text-gray-300 mb-1">
                Computer Science Engineering — Artificial Intelligence
              </p>
              <p className="text-base text-gray-500">
                Medi-Caps University, Indore · India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
