import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollVisibility } from '@/hooks/useScrollVisibility'
import { cn } from '@/lib/utils'
import { useSectionOrder } from '@/hooks/useSectionOrder'

const navLabels: Record<string, string> = {
  about: 'About',
  skills: 'Stack',
  projects: 'Projects',
  education: 'Education',
  goals: 'Goals',
}

export function Navigation() {
  const { order } = useSectionOrder()
  const navItems = [
    ...order.filter((id) => navLabels[id]).map((id) => ({ id, label: navLabels[id] })),
    { id: 'contact', label: 'Contact' },
  ]
  const activeSection = useActiveSection()
  const isVisible = useScrollVisibility()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start md:hidden">
        <button
          onClick={() => scrollToSection('about')}
          className="text-sm font-medium text-white mix-blend-difference tracking-widest"
        >
          GV
        </button>

        <div className="relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sm text-white mix-blend-difference"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>

          <div
            className={cn(
              'absolute right-0 flex flex-col items-end gap-3 mt-6 transition-all duration-300',
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            )}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1',
                  'hover:opacity-60',
                  activeSection === item.id &&
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop monogram - top left */}
      <div className="hidden md:block fixed top-0 left-0 z-50 p-6 md:p-10">
        <button
          onClick={() => scrollToSection('about')}
          className="text-sm font-medium text-white mix-blend-difference tracking-[0.3em]"
        >
          GOURAV VYAS
        </button>
      </div>

      {/* Desktop Navigation - Fixed Bottom Right */}
      <nav
        className={cn(
          'hidden md:block fixed bottom-0 right-0 z-50 p-6 md:p-10 transition-all duration-500',
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-end gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm text-white mix-blend-difference transition-all duration-300 relative py-1',
                'hover:opacity-60',
                activeSection === item.id &&
                  'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
