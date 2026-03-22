'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let rafId: number
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Add trail
      trailIdRef.current += 1
      setTrails(prev => {
        const newTrails = [...prev, { x: mouseX, y: mouseY, id: trailIdRef.current }]
        if (newTrails.length > 5) {
          return newTrails.slice(-5)
        }
        return newTrails
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.hoverable
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.hoverable
      ) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      const ease = 0.15
      cursorX += (mouseX - cursorX) * ease
      cursorY += (mouseY - cursorY) * ease
      
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Clear old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-3))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      />
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) * 0.1,
            transform: `translate(-50%, -50%) scale(${0.3 + index * 0.1})`,
          }}
        />
      ))}
    </>
  )
}
