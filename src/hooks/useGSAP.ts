import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function useRevealOnScroll(selector: string, options?: gsap.TweenVars) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            ...options,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [selector])
}

export function useSplitTextReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    const text = el.innerText
    const words = text.split(' ')

    el.innerHTML = words
      .map(
        (word) =>
          `<span class="reveal-line"><span style="display:inline-block">${word}</span></span>`
      )
      .join(' ')

    const spans = el.querySelectorAll('.reveal-line span')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { y: '110%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref])
}
