import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef(null)
  
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsRevealed(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
    
    observer.observe(element)
    
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])
  
  return [elementRef, isRevealed]
}

export const useStickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return isScrolled
}

