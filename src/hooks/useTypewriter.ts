import { useState, useEffect, useCallback } from 'react'

export default function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      setText(currentWord.slice(0, text.length + 1))
      if (text.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }
    } else {
      setText(currentWord.slice(0, text.length - 1))
      if (text.length - 1 === 0) {
        setIsDeleting(false)
        setWordIndex((wordIndex + 1) % words.length)
        return
      }
    }
  }, [text, wordIndex, isDeleting, words, pauseTime])

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typingSpeed, deletingSpeed])

  return text
}
