import { AnimatePresence } from 'framer-motion'
import { Section } from './Section'
import { SectionContent } from './SectionContent'

type SectionContainerProps = {
  current: number
  goTo: (index: number) => void
  sectionCount: number
}

export function SectionContainer({ current, goTo, sectionCount }: SectionContainerProps) {
  return (
    <div className="relative flex-1 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <Section key={current} index={current}>
          <SectionContent
            index={current}
            sectionCount={sectionCount}
            onNavClick={goTo}
          />
        </Section>
      </AnimatePresence>
    </div>
  )
}
