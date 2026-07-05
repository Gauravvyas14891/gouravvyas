import { motion } from 'framer-motion'
import { useSiteSettings } from '@/hooks/useSiteData'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Contact() {
  const { settings } = useSiteSettings()

  const items = [
    { label: 'Email', value: settings?.email || '—', href: settings?.email ? `mailto:${settings.email}` : undefined },
    {
      label: 'GitHub',
      value: settings?.github_url ? settings.github_url.replace(/^https?:\/\/(www\.)?github\.com\//, '') : '—',
      href: settings?.github_url || undefined,
    },
    {
      label: 'LinkedIn',
      value: settings?.linkedin_url
        ? settings.linkedin_url.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')
        : '—',
      href: settings?.linkedin_url || undefined,
    },
    { label: 'Location', value: settings?.location || 'India' },
  ]

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Contact</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[14vw] lg:text-[10rem] leading-none tracking-tighter mb-12"
        >
          LET'S<br />
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            CONNECT.
          </span>
        </motion.h2>

        <motion.p {...fadeInUp} className="text-lg lg:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12">
          I'm always open to conversations around AI, startups, open source, or interesting engineering
          problems. Reach out via any of these channels.
        </motion.p>

        <motion.div {...fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {items.map((item) => {
            const Wrapper = item.href ? 'a' : 'div'
            return (
              <Wrapper
                key={item.label}
                {...(item.href
                  ? { href: item.href, target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="border border-gray-800 rounded-xl p-5 bg-white/[0.015] hover:border-gray-700 transition-colors block"
              >
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">{item.label}</p>
                <p className="text-base text-gray-300 break-all">{item.value}</p>
              </Wrapper>
            )
          })}
        </motion.div>

        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Gourav Vyas. Built with care.
          </p>
          <p className="text-xs text-gray-600">{settings?.location || 'India'}</p>
        </motion.footer>
      </div>
    </section>
  )
}
