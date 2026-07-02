import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16 text-gray-200"
        >
          BUILDING TO<br />
          <span className="text-white">LEARN.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            <motion.p {...fadeInUp} className="text-lg lg:text-xl text-gray-300 leading-relaxed">
              I believe the best way to learn technology is by building. Instead of limiting myself to
              coursework, I develop applications that solve real problems.
            </motion.p>
            <motion.p {...fadeInUp} className="text-base text-gray-400 leading-relaxed">
              My interests span artificial intelligence, web development, cybersecurity, entrepreneurship,
              and software engineering. I'm currently focused on sharpening my development skills,
              strengthening my AI knowledge, contributing to open source, and building startup products
              that create meaningful impact.
            </motion.p>
            <motion.p {...fadeInUp} className="text-base text-gray-400 leading-relaxed">
              I learn by experimentation — taking on challenging projects and continuously improving my
              technical abilities.
            </motion.p>
          </div>

          <motion.aside
            {...fadeInUp}
            className="lg:col-span-5 border-l border-gray-800 pl-6 lg:pl-10"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Career Objective</p>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              To become an AI engineer and technology entrepreneur — building intelligent software that
              solves meaningful real-world problems by combining
              <span className="text-white"> Artificial Intelligence, Data Science, and Cybersecurity</span>.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
