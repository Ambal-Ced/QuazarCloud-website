import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { sectionVariants, getTransitionForSection, type TransitionType } from './transitions'

type SectionProps = {
  index: number
  children: ReactNode
  transitionType?: TransitionType
}

export function Section({ index, children, transitionType }: SectionProps) {
  const type = transitionType ?? getTransitionForSection(index)
  const variants = sectionVariants[type]

  return (
    <motion.div
      key={index}
      className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={
        type === 'flip'
          ? { perspective: 1200, transformStyle: 'preserve-3d' as const, backfaceVisibility: 'hidden' }
          : type === 'lineReveal'
            ? { overflow: 'hidden' }
            : undefined
      }
    >
      <div className="mx-auto max-w-4xl px-6 py-12 text-center">
        {children}
      </div>
    </motion.div>
  )
}
