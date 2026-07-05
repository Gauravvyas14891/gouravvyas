import { motion } from 'framer-motion'
import { useCustomSections, type CustomSection, type SectionItem } from '@/hooks/useSiteData'
import { FileText, Download } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function DynamicSections() {
  const { sections, items } = useCustomSections()

  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section) => {
        const secItems = items.filter((i) => i.section_id === section.id)
        return <SectionBlock key={section.id} section={section} items={secItems} />
      })}
    </>
  )
}

function SectionBlock({ section, items }: { section: CustomSection; items: SectionItem[] }) {
  return (
    <section id={section.slug} className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">{section.title}</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-10"
        >
          {section.title.toUpperCase()}
        </motion.h2>

        {section.intro && (
          <motion.p {...fadeInUp} className="text-lg text-gray-400 max-w-3xl mb-16 leading-relaxed">
            {section.intro}
          </motion.p>
        )}

        {section.type === 'documents' ? (
          <DocumentsGrid items={items} />
        ) : section.type === 'cards' ? (
          <CardsGrid items={items} />
        ) : (
          <Timeline items={items} />
        )}
      </div>
    </section>
  )
}

function Timeline({ items }: { items: SectionItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          className="border border-gray-800 rounded-2xl p-6 lg:p-10 bg-white/[0.015] hover:border-gray-700 transition-colors"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-widest uppercase text-gray-500">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-2xl lg:text-3xl text-white font-light mb-2">{item.title}</h3>
              {item.subtitle && <p className="text-base text-gray-300 mb-1">{item.subtitle}</p>}
              {item.description && (
                <p className="text-sm text-gray-500 mt-3 leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              )}
              {item.file_url && (
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-gray-300 hover:text-white border border-gray-800 rounded-full px-4 py-2"
                >
                  <FileText className="w-4 h-4" />
                  {item.file_name || 'View document'}
                </a>
              )}
            </div>
            <div className="lg:col-span-3 lg:text-right">
              {item.period && (
                <span className="text-sm text-gray-400 tabular-nums tracking-wider">{item.period}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function CardsGrid({ items }: { items: SectionItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className="border border-gray-800 rounded-2xl p-6 bg-white/[0.015] hover:border-gray-700 transition-colors"
        >
          <h3 className="text-xl text-white font-light mb-2">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-gray-400 mb-3">{item.subtitle}</p>}
          {item.description && (
            <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">{item.description}</p>
          )}
          {item.period && <p className="text-xs text-gray-600 mt-4 tracking-widest uppercase">{item.period}</p>}
          {item.file_url && (
            <a
              href={item.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs text-gray-300 hover:text-white"
            >
              <Download className="w-3 h-3" />
              {item.file_name || 'Download'}
            </a>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function DocumentsGrid({ items }: { items: SectionItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <motion.a
          key={item.id}
          href={item.file_url || '#'}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="flex items-start gap-4 border border-gray-800 rounded-xl p-5 bg-white/[0.015] hover:border-gray-700 transition group"
        >
          <FileText className="w-6 h-6 text-gray-500 group-hover:text-white transition mt-1" />
          <div className="flex-1">
            <h3 className="text-lg text-white font-light">{item.title}</h3>
            {item.subtitle && <p className="text-sm text-gray-400 mt-1">{item.subtitle}</p>}
            {item.period && <p className="text-xs text-gray-600 mt-2 tracking-widest uppercase">{item.period}</p>}
          </div>
        </motion.a>
      ))}
    </div>
  )
}
