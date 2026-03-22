'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, X } from 'lucide-react'

interface StatCard {
  value: string
  numericValue: number
  prefix?: string
  suffix?: string
  label: string
  source: string
  color: string
}

const stats: StatCard[] = [
  { value: '54,000', numericValue: 54000, suffix: '+', label: 'Annual Delhi deaths prevented', source: 'IIT Indore, Nature 2024', color: '#F5C9A0' },
  { value: '272', numericValue: 272, label: 'Wards monitored', source: 'Delhi MCD 2025', color: '#E8A85C' },
  { value: '15', prefix: '<', suffix: ' min', numericValue: 15, label: 'Spike to legal notice', source: 'System benchmark', color: '#4CAF8C' },
  { value: '29K', prefix: '₹', suffix: '/ward/yr', numericValue: 29, label: 'vs ₹3.5Cr CPCB station', source: 'Cost analysis 2025', color: '#C4833A' },
  { value: '87', suffix: '%', numericValue: 87, label: 'ML attribution accuracy', source: 'Validation dataset', color: '#7B68EE' },
  { value: '1/120', suffix: 'th', numericValue: 1, label: 'Our cost vs CPCB', source: 'Comparative study', color: '#F5C9A0' },
]

const costBars = [
  { label: 'CPCB Station', value: '₹3.5 Crore/point', width: 100, color: '#D94F4F' },
  { label: 'Competitor Average', value: '₹85 Lakh/point', width: 24, color: '#E07B3A' },
  { label: 'Project Vaayu', value: '₹29,000/ward/yr', width: 0.8, color: '#C4833A', badge: '120× CHEAPER' },
]

const comparisonFeatures = [
  'Ward-level granularity',
  'Source attribution',
  'Legal automation',
  'Predictive capability',
  'Health vulnerability profiles',
  'Offline-first delivery',
  'Cross-border stubble tracking',
  'Self-improving ML',
]

const competitors = [
  { name: 'SAFAR', features: [false, false, false, true, false, false, false, false] },
  { name: 'CPCB Sameer', features: [false, false, false, false, false, false, false, false] },
  { name: 'IQAir', features: [false, false, false, false, false, true, false, false] },
  { name: 'Ambee', features: [true, false, false, true, false, false, false, false] },
]

function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '',
  duration = 2000 
}: { 
  value: number
  prefix?: string
  suffix?: string
  duration?: number 
}) {
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
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function DataSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [barsRef, barsInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    if (barsInView) {
      const timer = setTimeout(() => setShowBadge(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [barsInView])

  return (
    <section id="data" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            THE DATA
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Live <span className="text-gradient-gold">Intelligence</span>
          </h2>
        </motion.div>

        {/* Impact counters */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="vaayu-card p-6 group hover:animate-pulse-glow"
              data-hoverable
            >
              <div 
                className="text-4xl md:text-5xl font-display font-bold mb-2"
                style={{ color: stat.color }}
              >
                <AnimatedCounter 
                  value={stat.numericValue} 
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-white font-medium mb-2">{stat.label}</div>
              <div className="text-xs text-[#7A7A9A] flex items-center gap-1">
                <span className="w-1 h-1 bg-[#C4833A] rounded-full" />
                {stat.source}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cost comparison chart */}
        <motion.div
          ref={barsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={barsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="vaayu-card p-8 md:p-12 mb-20"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8">Cost Comparison</h3>
          
          <div className="space-y-6">
            {costBars.map((bar, index) => (
              <div key={bar.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#C8C8D8]">{bar.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-mono">{bar.value}</span>
                    {bar.badge && showBadge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-2 py-0.5 rounded text-xs font-bold bg-[#4CAF8C]/20 text-[#4CAF8C]"
                      >
                        {bar.badge}
                      </motion.span>
                    )}
                  </div>
                </div>
                <div className="h-8 bg-[#1A1A2E] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bar.color }}
                    initial={{ width: 0 }}
                    animate={barsInView ? { width: `${bar.width}%` } : {}}
                    transition={{ 
                      delay: index * 0.2, 
                      duration: 1.2, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-[#7A7A9A] font-normal">Feature</th>
                {competitors.map((comp) => (
                  <th key={comp.name} className="p-4 text-center">
                    <span className="text-[#D94F4F] font-display font-bold">{comp.name}</span>
                  </th>
                ))}
                <th className="p-4 text-center">
                  <span className="text-[#C4833A] font-display font-bold">Project Vaayu</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, fIndex) => (
                <motion.tr
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + fIndex * 0.05 }}
                  className="border-t border-[rgba(196,131,58,0.08)]"
                >
                  <td className="p-4 text-[#C8C8D8]">{feature}</td>
                  {competitors.map((comp) => (
                    <td key={`${comp.name}-${feature}`} className="p-4 text-center">
                      {comp.features[fIndex] ? (
                        <Check className="w-5 h-5 text-[#4CAF8C] mx-auto opacity-50" />
                      ) : (
                        <X className="w-5 h-5 text-[#D94F4F] mx-auto opacity-50" />
                      )}
                    </td>
                  ))}
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-[#4CAF8C] mx-auto" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
