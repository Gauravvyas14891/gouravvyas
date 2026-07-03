import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Background gradient + subtle glow */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3 text-xs tracking-widest uppercase text-gray-500"
          >
            <span className="w-8 h-px bg-gray-600" />
            <span>PORTFOLIO — 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display leading-[0.9] tracking-tighter text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[9rem]"
          >
            <span className="block text-white">GOURAV</span>
            <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              VYAS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            AI Student · Full Stack Developer · Data Science & Cybersecurity Enthusiast · Startup Builder.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed"
          >
            Computer Science Engineering (AI) undergraduate at Medi-Caps University, Indore.
            Building real-world products with modern web technologies and artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {['AI', 'Full Stack', 'Data Science', 'Cybersecurity'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-xs tracking-widest uppercase text-gray-300 border border-gray-800 rounded-full backdrop-blur-sm bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 tracking-widest uppercase"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
