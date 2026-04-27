import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGSAP'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 })
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.35 })
    }

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3 })
      gsap.to(follower, { scale: 1.8, opacity: 0.6, duration: 0.3 })
    }

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach((l) => {
      l.addEventListener('mouseenter', onEnterLink)
      l.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      links.forEach((l) => {
        l.removeEventListener('mouseenter', onEnterLink)
        l.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  )
}
