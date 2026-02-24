import { Variants } from 'framer-motion'

const duration = 0.7
const ease = [0.33, 0, 0.2, 1] as const
const fadeInDuration = 0.46
const fadeOutDuration = 0.35

export type TransitionType = 'fade' | 'pushUp' | 'pushDown' | 'wipeLeft' | 'reveal' | 'flip' | 'lineReveal'

function makeVariants(
  initial: object,
  animate: object,
  exit: object,
  exitTransition?: object,
  initialTransition?: object,
  animateTransition?: object,
): Variants {
  const defaultTransition = { duration, ease }
  return {
    initial: { ...initial, transition: initialTransition ?? defaultTransition },
    animate: { ...animate, transition: animateTransition ?? defaultTransition },
    exit: { ...exit, transition: exitTransition ?? defaultTransition },
  }
}

const fadeOnlyTransition = {
  opacity: { duration: duration, ease },
}

const pushUpVariants = makeVariants(
  { opacity: 0, y: '100%' },
  { opacity: 1, y: 0 },
  { opacity: 0, y: '-100%' },
  { opacity: { duration: fadeOutDuration, ease }, y: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, y: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, y: { duration, ease } },
)

const pushDownVariants = makeVariants(
  { opacity: 0, y: '-100%' },
  { opacity: 1, y: 0 },
  { opacity: 0, y: '100%' },
  { opacity: { duration: fadeOutDuration, ease }, y: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, y: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, y: { duration, ease } },
)

const wipeLeftVariants = makeVariants(
  { opacity: 0, x: '100%' },
  { opacity: 1, x: 0 },
  { opacity: 0, x: '-100%' },
  { opacity: { duration: fadeOutDuration, ease }, x: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, x: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, x: { duration, ease } },
)

const revealVariants = makeVariants(
  { opacity: 0, x: '-100%' },
  { opacity: 1, x: 0 },
  { opacity: 0, x: '100%' },
  { opacity: { duration: fadeOutDuration, ease }, x: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, x: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, x: { duration, ease } },
)

const flipVariants = makeVariants(
  { opacity: 0, rotateY: -85 },
  { opacity: 1, rotateY: 0 },
  { opacity: 0, rotateY: 85 },
  { opacity: { duration: fadeOutDuration, ease }, rotateY: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, rotateY: { duration, ease } },
  { opacity: { duration: fadeInDuration, ease }, rotateY: { duration, ease } },
)

const lineRevealClipTransition = { duration: 1.8, ease }

const lineRevealVariants: Variants = {
  initial: {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 1,
    transition: lineRevealClipTransition,
  },
  animate: {
    clipPath: 'inset(0 0 0 0)',
    opacity: 1,
    transition: lineRevealClipTransition,
  },
  exit: {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 1,
    transition: lineRevealClipTransition,
  },
}

export const sectionVariants: Record<TransitionType, Variants> = {
  fade: makeVariants(
    { opacity: 0 },
    { opacity: 1 },
    { opacity: 0 },
    { opacity: { duration: fadeOutDuration, ease } },
    fadeOnlyTransition,
    { opacity: { duration: fadeInDuration, ease } },
  ),
  pushUp: pushUpVariants,
  pushDown: pushDownVariants,
  wipeLeft: wipeLeftVariants,
  reveal: revealVariants,
  flip: flipVariants,
  lineReveal: lineRevealVariants,
}

const transitionOrder: TransitionType[] = ['fade', 'pushUp', 'pushDown', 'wipeLeft', 'reveal', 'flip', 'lineReveal']

export function getTransitionForSection(index: number): TransitionType {
  return transitionOrder[index % transitionOrder.length]
}
