import { motion } from 'framer-motion'
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
} from 'react-icons/si'
import { FaJava, FaBrain } from 'react-icons/fa'
import { VscCode } from 'react-icons/vsc'
import type { IconType } from 'react-icons'

type Skill = { name: string; icon?: IconType; note?: string }
type Category = { title: string; items: Skill[] }

const categories: Category[] = [
  {
    title: 'Languages',
    items: [
      { name: 'Java', icon: FaJava },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'TypeScript', icon: SiTypescript, note: 'Basic' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: SiBootstrap },
      { name: 'Responsive Design' },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Database',
    items: [{ name: 'MongoDB', icon: SiMongodb }],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: VscCode },
      { name: 'Cursor AI' },
      { name: 'Postman', icon: SiPostman },
      { name: 'npm', icon: SiNpm },
    ],
  },
  {
    title: 'AI & Learning',
    items: [
      { name: 'Artificial Intelligence', icon: SiOpenai },
      { name: 'Prompt Engineering' },
      { name: 'AI-assisted Development' },
    ],
  },
]

const learning = ['Data Science', 'Cybersecurity', 'Machine Learning', 'System Design']

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

function Pill({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-800 bg-white/[0.02] hover:bg-white/[0.05] hover:border-gray-600 transition-all duration-300"
    >
      {Icon && (
        <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
      )}
      <span className="text-sm text-gray-300 font-light">
        {skill.name}
        {skill.note && <span className="text-gray-600 ml-1.5">· {skill.note}</span>}
      </span>
    </motion.span>
  )
}

function CategoryCard({ category, delay }: { category: Category; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay }}
      className="relative border border-gray-800 rounded-2xl p-6 lg:p-8 bg-white/[0.015] backdrop-blur-sm hover:border-gray-700 transition-colors duration-500"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs tracking-widest uppercase text-gray-500">
          {category.title}
        </span>
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-xs text-gray-600 tabular-nums">
          {String(category.items.length).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.items.map((s, i) => (
          <Pill key={s.name} skill={s} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Stack & Skills</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-[6rem] leading-none tracking-tight mb-16 lg:mb-20"
        >
          THE STACK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {categories.map((c, i) => (
            <CategoryCard key={c.title} category={c} delay={i * 0.08} />
          ))}
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-12 lg:mt-16 border border-dashed border-gray-800 rounded-2xl p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs tracking-widest uppercase text-gray-500">
              Currently Learning
            </span>
            <div className="flex-1 h-px bg-gray-800" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {learning.map((l, i) => (
              <Pill key={l} skill={{ name: l }} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
