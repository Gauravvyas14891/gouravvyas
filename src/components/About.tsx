import { motion } from 'framer-motion'
import { useContentBlock } from '@/hooks/useSiteData'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function About() {
  const { data: content } = useContentBlock('about')
  const headings = content.headings?.length ? content.headings : ['BUILDING TO', 'LEARN.']

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">{content.eyebrow}</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16 text-gray-200"
        >
          {headings.map((line, index) => (
            <span key={line + index} className={index === headings.length - 1 ? 'text-white' : undefined}>
              {line}
              {index < headings.length - 1 && <br />}
            </span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-7 space-y-6">
            {content.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph + index}
                {...fadeInUp}
                className={index === 0 ? 'text-lg lg:text-xl text-gray-300 leading-relaxed' : 'text-base text-gray-400 leading-relaxed'}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.aside
            {...fadeInUp}
            className="lg:col-span-5 border-l border-gray-800 pl-6 lg:pl-10"
          >
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">{content.aside.title}</p>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              {content.aside.text}
              {content.aside.highlight && <span className="text-white"> {content.aside.highlight}</span>}.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
