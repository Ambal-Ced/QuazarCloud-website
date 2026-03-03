/**
 * LogoAnimation — ArZen. logo with wave bounce on hover.
 * After 10s hover: each letter bounces once, explodes into green particles, then particles converge to Z position and compress into circle.
 */
import { useEffect, useRef, useState } from 'react'

const LOGO_TEXT = 'ArZen'
const HOVER_TRIGGER_MS = 10000
const EMERALD = '#10b981'
const BOUNCE_DURATION_MS = 350
const CHAR_COUNT = 6 // 5 letters + dot
const Z_INDEX = 2 // position of "Z" in ArZen

export function LogoAnimation() {
  const logoRef = useRef<HTMLDivElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([])
  const zPositionRef = useRef<{ x: number; y: number } | null>(null)
  const [logoHover, setLogoHover] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'bounce-explode' | 'converge'>('idle')
  const [explodedIndex, setExplodedIndex] = useState<number>(-1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 10s hover trigger
  useEffect(() => {
    if (!logoHover) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      return
    }
    timerRef.current = setTimeout(() => {
      if (phase === 'idle') setPhase('bounce-explode')
      timerRef.current = null
    }, HOVER_TRIGGER_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [logoHover, phase])

  // Bounce one-by-one, explode when each touches bottom
  useEffect(() => {
    if (phase !== 'bounce-explode') return

    const explodeAt = (index: number) => {
      const el = charRefs.current[index]
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      if (index === Z_INDEX) {
        zPositionRef.current = { x: centerX, y: centerY }
      }

      const particleCount = 12
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div')
        const size = 3 + Math.random() * 5
        p.className = 'logo-anim-particle'
        p.style.cssText = `
          position:fixed;width:${size}px;height:${size}px;border-radius:50%;
          background:${EMERALD};left:${centerX}px;top:${centerY}px;
          transform:translate(-50%,-50%);pointer-events:none;z-index:10000;
        `
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const dist = 40 + Math.random() * 60
        const tx = Math.cos(angle) * dist
        const ty = Math.sin(angle) * dist
        document.body.appendChild(p)
        p.animate(
          [
            { transform: 'translate(-50%,-50%)' },
            { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px))` },
          ],
          { duration: 400, easing: 'ease-out', fill: 'forwards' }
        )
      }

      setExplodedIndex((prev) => {
        const next = Math.max(prev, index)
        if (next === CHAR_COUNT - 1) {
          setTimeout(() => setPhase('converge'), 500)
        }
        return next
      })
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < CHAR_COUNT; i++) {
      const t = setTimeout(() => explodeAt(i), (i + 1) * BOUNCE_DURATION_MS)
      timeouts.push(t)
    }

    return () => timeouts.forEach(clearTimeout)
  }, [phase])

  // Particles converge to Z position and compress into circle
  useEffect(() => {
    if (phase !== 'converge') return

    const zPos = zPositionRef.current
    if (!zPos) {
      setPhase('idle')
      setExplodedIndex(-1)
      setLogoHover(false)
      return
    }

    const particles = document.querySelectorAll<HTMLDivElement>('.logo-anim-particle')
    const convergeDuration = 1500
    const circleMaxSize = 55

    // Create circle at Z position - grows slowly while particles converge
    const circle = document.createElement('div')
    circle.className = 'logo-anim-circle'
    circle.style.cssText = `
      position:fixed;left:${zPos.x}px;top:${zPos.y}px;width:0;height:0;
      border-radius:50%;background:${EMERALD};transform:translate(-50%,-50%);
      pointer-events:none;z-index:10001;
    `
    document.body.appendChild(circle)
    circle.animate(
      [{ width: 0, height: 0 }, { width: circleMaxSize, height: circleMaxSize }],
      { duration: convergeDuration, easing: 'ease-out', fill: 'forwards' }
    )

    const promises = Array.from(particles).map((p) => {
      const startLeft = parseFloat(p.style.left) || 0
      const startTop = parseFloat(p.style.top) || 0

      return new Promise<void>((res) => {
        p.animate(
          [
            { left: `${startLeft}px`, top: `${startTop}px` },
            { left: `${zPos.x}px`, top: `${zPos.y}px`, transform: 'translate(-50%,-50%)' },
          ],
          { duration: convergeDuration, easing: 'ease-in', fill: 'forwards' }
        ).onfinish = () => {
          p.remove()
          res()
        }
      })
    })

    Promise.all(promises).then(() => {
      setTimeout(() => {
        circle.remove()
        setPhase('idle')
        setExplodedIndex(-1)
        setLogoHover(false)
      }, 300)
    })
  }, [phase])

  const showBounce = logoHover && phase === 'idle'
  const showExplodeBounce = phase === 'bounce-explode'

  return (
    <div
      ref={logoRef}
      style={{ marginBottom: 24, fontSize: '2.9rem', fontWeight: 600, cursor: 'default' }}
      id="sidebar-logo"
      className={showBounce ? 'sidebar-logo-bouncing' : ''}
      onMouseEnter={() => setLogoHover(true)}
      onMouseLeave={() => {
        if (phase === 'idle') setLogoHover(false)
      }}
    >
      {[...LOGO_TEXT].map((c, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el }}
          className={`sidebar-logo-char ${showExplodeBounce ? 'logo-bounce-once' : ''}`}
          style={{
            display: 'inline-block',
            visibility: explodedIndex >= i ? 'hidden' : 'visible',
            animationDelay: showExplodeBounce ? `${i * BOUNCE_DURATION_MS}ms` : undefined,
          }}
        >
          {c}
        </span>
      ))}
      <span
        ref={(el) => { charRefs.current[5] = el }}
        className={`sidebar-logo-dot ${showExplodeBounce ? 'logo-bounce-once' : ''}`}
        style={{
          display: 'inline-block',
          color: EMERALD,
          visibility: explodedIndex >= 5 ? 'hidden' : 'visible',
          animationDelay: showExplodeBounce ? `${5 * BOUNCE_DURATION_MS}ms` : undefined,
        }}
      >
        .
      </span>
    </div>
  )
}
