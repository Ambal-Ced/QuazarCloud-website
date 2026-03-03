/**
 * Sidebar.tsx — Left navigation. Go-to-section (no scroll).
 * Arch hover: whichever item is hovered becomes the peak; others form an arch around it.
 * Logo: ArZen. with wave bounce on hover; 10s hover triggers bounce-explode sequence.
 */
import { useEffect, useRef, useState } from 'react'
import { LogoAnimation } from './LogoAnimation'

const NAV_LABELS = ['Home', 'About', 'Projects', 'Experience', 'Credentials', 'Resume']
const DIAMOND_ANIM_DURATION = 400

type SidebarProps = {
  currentSection: number
  onNavigate: (index: number) => void
}

export function Sidebar({ currentSection, onNavigate }: SidebarProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [prevSection, setPrevSection] = useState<number | null>(null)
  const [justActivated, setJustActivated] = useState<number | null>(null)
  const prevSectionRef = useRef(currentSection)

  useEffect(() => {
    if (prevSectionRef.current !== currentSection) {
      setPrevSection(prevSectionRef.current)
      setJustActivated(currentSection)
      prevSectionRef.current = currentSection
      const t = setTimeout(() => {
        setPrevSection(null)
        setJustActivated(null)
      }, DIAMOND_ANIM_DURATION)
      return () => clearTimeout(t)
    }
  }, [currentSection])

  const getArchIndent = (itemIndex: number) => {
    if (hoveredIndex === null) return 0
    const dist = Math.abs(itemIndex - hoveredIndex)
    return itemIndex === hoveredIndex ? 7 : Math.max(0, 5 - dist)
  }

  return (
    <aside className="app-sidebar" aria-label="Main navigation">
      <LogoAnimation />
      <nav
        style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_LABELS.map((label, i) => {
          const isActive = i === currentSection
          const indent = getArchIndent(i)
          const paddingLeft = 24 + indent * 9
          return (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              className={`relative block w-full overflow-hidden rounded px-3 py-2 text-left uppercase tracking-wide transition-all duration-300 ease-in-out before:absolute before:inset-0 before:z-0 before:rounded before:bg-emerald-500/20 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out before:content-[''] hover:before:scale-x-100 after:absolute after:inset-0 after:z-0 after:rounded after:bg-emerald-500/10 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:content-[''] ${
                isActive ? 'after:scale-x-100 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
              }`}
              style={{
                paddingLeft: `${paddingLeft}px`,
                letterSpacing: '0.5px',
                fontSize: '0.875rem',
              }}
            >
              {(isActive || i === prevSection) && (
                <span
                  className={`absolute top-[calc(50%+2px)] -translate-y-1/2 rotate-45 transition-all duration-300 ease-in-out ${
                    i === prevSection ? 'animate-diamond-expand-shrink' : ''
                  } ${i === justActivated ? 'animate-diamond-spin-in' : ''}`}
                  style={{
                    left: `${8 + indent * 9}px`,
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                  }}
                />
              )}
              {!isActive && i !== prevSection && (
                <span
                  className="absolute top-[calc(50%+2px)] -translate-y-1/2 rotate-45 transition-all duration-300 ease-in-out"
                  style={{
                    left: `${8 + indent * 9}px`,
                    width: '6px',
                    height: '6px',
                    background: '#71717a',
                  }}
                />
              )}
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
