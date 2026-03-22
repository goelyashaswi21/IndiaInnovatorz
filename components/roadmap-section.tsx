"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    timeline: "Q1-Q2 2025",
    status: "active",
    milestones: [
      "Delhi pilot deployment (100 sensors)",
      "Core AI model training",
      "Government partnership framework",
      "Real-time dashboard MVP"
    ]
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    timeline: "Q3-Q4 2025",
    status: "upcoming",
    milestones: [
      "Scale to 500 sensors",
      "Multi-city expansion (Mumbai, Bangalore)",
      "Predictive analytics v2",
      "Mobile app launch"
    ]
  },
  {
    phase: "Phase 3",
    title: "Intelligence",
    timeline: "Q1-Q2 2026",
    status: "upcoming",
    milestones: [
      "Advanced ML models",
      "Cross-city data correlation",
      "Policy recommendation engine",
      "Public API release"
    ]
  },
  {
    phase: "Phase 4",
    title: "National Scale",
    timeline: "Q3 2026+",
    status: "future",
    milestones: [
      "Pan-India deployment",
      "International partnerships",
      "Research publication",
      "Open-source framework"
    ]
  }
]

export function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % phases.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="relative min-h-screen  py-32 overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-sm text-primary">
            ROADMAP
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-foreground md:text-7xl">
            The Path
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Forward
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted">
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary to-accent"
              initial={{ height: 0 }}
              animate={isInView ? { height: `${((activePhase + 1) / phases.length) * 100}%` } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative grid gap-8 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:direction-rtl'}`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                  <motion.div
                    className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                      activePhase === index 
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                        : 'border-muted bg-card/50 hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActivePhase(index)}
                  >
                    <div className={`mb-4 flex items-center gap-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className={`rounded-full px-3 py-1 font-mono text-xs ${
                        phase.status === 'active' 
                          ? 'bg-primary text-primary-foreground' 
                          : phase.status === 'upcoming'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {phase.timeline}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">{phase.phase}</span>
                    </div>

                    <h3 className="mb-4 text-3xl font-bold text-foreground">{phase.title}</h3>

                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {phase.milestones.map((milestone, mIndex) => (
                        <motion.li
                          key={mIndex}
                          initial={{ opacity: 0 }}
                          animate={activePhase === index ? { opacity: 1 } : { opacity: 0.5 }}
                          transition={{ delay: mIndex * 0.1 }}
                          className="flex items-center gap-2 text-muted-foreground"
                          style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
                        >
                          {index % 2 !== 0 && (
                            <span className={`h-1.5 w-1.5 rounded-full ${activePhase === index ? 'bg-primary' : 'bg-muted-foreground'}`} />
                          )}
                          <span>{milestone}</span>
                          {index % 2 === 0 && (
                            <span className={`h-1.5 w-1.5 rounded-full ${activePhase === index ? 'bg-primary' : 'bg-muted-foreground'}`} />
                          )}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Glow effect */}
                    {activePhase === index && (
                      <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2">
                  <motion.div
                    className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      activePhase >= index 
                        ? 'border-primary bg-primary' 
                        : 'border-muted '
                    }`}
                    animate={activePhase === index ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1, repeat: activePhase === index ? Infinity : 0 }}
                  >
                    {activePhase >= index && (
                      <motion.div
                        className="absolute h-full w-full rounded-full bg-primary"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
