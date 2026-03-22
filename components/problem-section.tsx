'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

const crisisStats = [
  { value: 54000, suffix: '+', label: 'Annual Deaths', subtext: 'Premature deaths in Delhi alone', color: '#D94F4F' },
  { value: 180, suffix: '+', label: 'Danger Days', subtext: 'Days exceeding safe AQI limits yearly', color: '#E07B3A' },
  { value: 230, suffix: '', label: 'Unmonitored Wards', subtext: 'Out of 272 total wards in Delhi', color: '#C4833A' },
]

const systemFailures = [
  { id: 1, text: '40 stations for 1,484 sq km', detail: 'Massive coverage gaps leave most wards blind' },
  { id: 2, text: '24-hour rolling average = stale data', detail: 'Spikes go undetected for hours' },
  { id: 3, text: 'No automated source identification', detail: 'Manual guesswork determines responses' },
  { id: 4, text: 'GRAP: one size fits all 272 wards', detail: 'Blanket restrictions punish clean areas' },
  { id: 5, text: 'Generic alerts ignore health vulnerability', detail: 'Elderly and children get same warnings as healthy adults' },
  { id: 6, text: 'Zero predictive capability', detail: 'Always reacting, never preventing' },
]

function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return
    
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="problem" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D14] via-[#0D0D14] to-[#1A1A2E]/50" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            THE CRISIS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Why Delhi is <span className="text-[#D94F4F]">Dying</span>
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Stats */}
          <div className="space-y-8">
            {crisisStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="vaayu-card p-8 relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)` }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="text-5xl md:text-6xl font-display font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-display font-bold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-[#7A7A9A]">{stat.subtext}</div>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1, ease: 'easeOut' }}
                  style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Failure chain */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xl font-display font-bold text-white mb-6"
            >
              The 6 Core System Failures
            </motion.h3>

            {systemFailures.map((failure, index) => (
              <motion.div
                key={failure.id}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className="vaayu-card p-5 border-l-4 border-l-[#D94F4F] relative group cursor-pointer"
                data-hoverable
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#D94F4F] font-mono text-sm font-bold shrink-0">
                    {String(failure.id).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="text-white font-medium mb-1">{failure.text}</div>
                    <div className="text-sm text-[#7A7A9A] group-hover:text-[#C8C8D8] transition-colors">
                      {failure.detail}
                    </div>
                  </div>
                </div>

                {/* Connecting arrow */}
                {index < systemFailures.length - 1 && (
                  <div className="absolute -bottom-4 left-8 w-px h-4 bg-gradient-to-b from-[#D94F4F]/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <blockquote className="vaayu-card p-8 md:p-12 max-w-4xl mx-auto relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-[#C4833A]/30">&ldquo;</div>
            <p className="text-xl md:text-2xl text-white font-display italic leading-relaxed mb-4">
              NCAP has produced zero measurable reduction in Delhi emissions between 2019&ndash;2024
            </p>
            <cite className="text-[#C4833A] text-sm font-display not-italic">
              &mdash; EGUsphere / Copernicus 2025
            </cite>
          </blockquote>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
