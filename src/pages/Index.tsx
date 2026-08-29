import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'
import { Education } from '@/components/Education'
import { DynamicSections } from '@/components/DynamicSections'
import { Speaking } from '@/components/Speaking'
import { Contact } from '@/components/Contact'
import { useSectionOrder } from '@/hooks/useSectionOrder'
import type { SectionId } from '@/content/defaultContent'

const sectionComponents: Record<SectionId, () => JSX.Element | null> = {
  about: About,
  skills: Skills,
  projects: Work,
  education: Education,
  custom: DynamicSections,
  goals: Speaking,
}

export default function Index() {
  const { order } = useSectionOrder()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        {order.map((id) => {
          const Section = sectionComponents[id]
          return <Section key={id} />
        })}
        <Contact />
      </main>
    </div>
  )
}
