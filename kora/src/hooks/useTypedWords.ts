import { useEffect, useRef, useState } from 'react'

export function useTypedWords(
  text: string,
  enabled: boolean,
  instant: boolean,
  wordDelay = 55,
) {
  const words = text.split(' ')
  const [displayed, setDisplayed] = useState(instant ? words.length : 0)
  const countRef = useRef(displayed)

  useEffect(() => {
    if (instant) {
      countRef.current = words.length
      setDisplayed(words.length)
      return
    }

    if (!enabled) {
      countRef.current = 0
      setDisplayed(0)
      return
    }

    if (countRef.current >= words.length) return

    const timer = window.setInterval(() => {
      countRef.current += 1
      setDisplayed(countRef.current)

      if (countRef.current >= words.length) {
        clearInterval(timer)
      }
    }, wordDelay)

    return () => clearInterval(timer)
  }, [enabled, instant, text, wordDelay, words.length])

  return words.slice(0, displayed).join(' ')
}
