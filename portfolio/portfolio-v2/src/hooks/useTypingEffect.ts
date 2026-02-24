import { useState, useEffect, useRef } from 'react'

/**
 * Typing effect: cycles through phrases, typing character-by-character then deleting.
 * Matches the old portfolio's "I'm a [word]" rotation.
 */
export function useTypingEffect(
  phrases: string[],
  options: {
    typeSpeedMs?: number
    deleteSpeedMs?: number
    pauseAfterTypeMs?: number
    pauseAfterDeleteMs?: number
  } = {}
) {
  const {
    typeSpeedMs = 120,
    deleteSpeedMs = 60,
    pauseAfterTypeMs = 2000,
    pauseAfterDeleteMs = 500,
  } = options

  const [displayText, setDisplayText] = useState('')
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const isPausedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0)
  const phrasesRef = useRef(phrases)
  phrasesRef.current = phrases

  useEffect(() => {
    const phrasesList = phrasesRef.current
    if (phrasesList.length === 0) return

    const run = () => {
      if (isPausedRef.current) return
      const currentPhrase = phrasesRef.current[phraseIndexRef.current]
      if (!currentPhrase) return

      const isDeleting = isDeletingRef.current
      const charIndex = charIndexRef.current

      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          charIndexRef.current += 1
          setDisplayText(currentPhrase.slice(0, charIndexRef.current))
          timeoutRef.current = setTimeout(run, typeSpeedMs)
        } else {
          isPausedRef.current = true
          timeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            isDeletingRef.current = true
            run()
          }, pauseAfterTypeMs)
        }
      } else {
        if (charIndex > 0) {
          charIndexRef.current -= 1
          setDisplayText(currentPhrase.slice(0, charIndexRef.current))
          timeoutRef.current = setTimeout(run, deleteSpeedMs)
        } else {
          isPausedRef.current = true
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrasesRef.current.length
          isDeletingRef.current = false
          timeoutRef.current = setTimeout(() => {
            isPausedRef.current = false
            run()
          }, pauseAfterDeleteMs)
        }
      }
    }

    setDisplayText('')
    phraseIndexRef.current = 0
    charIndexRef.current = 0
    isDeletingRef.current = false
    isPausedRef.current = false
    timeoutRef.current = setTimeout(run, 0)
    return () => clearTimeout(timeoutRef.current)
  }, [phrases, typeSpeedMs, deleteSpeedMs, pauseAfterTypeMs, pauseAfterDeleteMs])

  return displayText
}
