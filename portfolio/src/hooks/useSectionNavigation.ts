import { useState, useCallback, useEffect, type RefObject } from 'react'

const SECTION_COUNT = 6
const THROTTLE_MS = 400

function isAtTop(el: HTMLElement) {
  return el.scrollTop <= 2
}

function isAtBottom(el: HTMLElement) {
  return el.scrollTop + el.clientHeight >= el.scrollHeight - 2
}

type ScrollableFlags = { showMoreOpen?: boolean; showMoreProjects?: boolean; showMoreCredentials?: boolean; showMoreExperience?: boolean; credentialModalOpen?: boolean; projectModalOpen?: boolean }

function isScrollableSection(current: number, flags: ScrollableFlags): boolean {
  const { showMoreProjects = false, showMoreCredentials = false } = flags
  return current === 1 || (current === 2 && showMoreProjects) || current === 3 || (current === 4 && showMoreCredentials)
}

export function useSectionNavigation(scrollContainerRef?: RefObject<HTMLElement | null>, flags: ScrollableFlags = {}) {
  const { showMoreOpen = false, showMoreProjects = false, showMoreCredentials = false, showMoreExperience = false, credentialModalOpen = false, projectModalOpen = false } = flags
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => {
    setCurrent((c) => (c < SECTION_COUNT - 1 ? c + 1 : c))
  }, [])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : c))
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent((index % SECTION_COUNT + SECTION_COUNT) % SECTION_COUNT)
  }, [])

  useEffect(() => {
    let lastWheel = 0

    const onWheel = (e: WheelEvent) => {
      if (credentialModalOpen || projectModalOpen) return
      const el = scrollContainerRef?.current
      const scrollable = isScrollableSection(current, flags) && el && el.scrollHeight > el.clientHeight

      if (scrollable) {
        const atTop = isAtTop(el)
        const atBottom = isAtBottom(el)
        const scrollingDown = e.deltaY > 0
        const scrollingUp = e.deltaY < 0

        if (scrollingDown && atBottom) {
          e.preventDefault()
          const now = Date.now()
          if (now - lastWheel < THROTTLE_MS) return
          lastWheel = now
          goNext()
        } else if (scrollingUp && atTop) {
          e.preventDefault()
          const now = Date.now()
          if (now - lastWheel < THROTTLE_MS) return
          lastWheel = now
          goPrev()
        }
        // else: allow default scroll within the section
        return
      }

      // Non-scrollable section: snap on any wheel
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel < THROTTLE_MS) return
      lastWheel = now
      if (e.deltaY > 0) goNext()
      else if (e.deltaY < 0) goPrev()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (credentialModalOpen || projectModalOpen) return
      const el = scrollContainerRef?.current
      const scrollable = isScrollableSection(current, flags) && el && el.scrollHeight > el.clientHeight

      if (scrollable) {
        const atTop = isAtTop(el)
        const atBottom = isAtBottom(el)
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault()
          if (atBottom) goNext()
          else el.scrollBy(0, e.key === 'PageDown' ? 300 : 80)
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault()
          if (atTop) goPrev()
          else el.scrollBy(0, e.key === 'PageUp' ? -300 : -80)
        }
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (credentialModalOpen || projectModalOpen) return
      const el = scrollContainerRef?.current
      const scrollable = isScrollableSection(current, flags) && el && el.scrollHeight > el.clientHeight

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY - touchEndY
      if (Math.abs(diff) < 50) return

      if (scrollable) {
        const atTop = isAtTop(el)
        const atBottom = isAtBottom(el)
        if (diff > 0 && atBottom) goNext()
        else if (diff < 0 && atTop) goPrev()
        return
      }

      if (diff > 0) goNext()
      else goPrev()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goNext, goPrev, current, scrollContainerRef, showMoreOpen, showMoreProjects, showMoreCredentials, showMoreExperience, credentialModalOpen, projectModalOpen])

  return { current, goNext, goPrev, goTo, sectionCount: SECTION_COUNT }
}
