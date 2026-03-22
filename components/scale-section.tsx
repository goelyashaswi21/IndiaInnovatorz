'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { IndiaMap } from './india-map'

const roadmapPhases = [
  { phase: 1, timeline: '0-6 months', wards: 272, sensors: 800, revenue: '₹2 Cr' },
  { phase: 2, timeline: '6-12 months', wards: 850, sensors: 2500, revenue: '₹9 Cr' },
  { phase: 3, timeline: '12-24 months', wards: 2500, sensors: 7500, revenue: '₹26 Cr' },
  { phase: 4, timeline: '24-36 months', wards: 5000, sensors: 15000, revenue: '₹110 Cr' },
]

const revenueData = [
  { year: 'Year 1', value: 2, width: 2 },
  { year: 'Year 2', value: 9, width: 8 },
  { year: 'Year 3', value: 26, width: 24 },
  { year: 'Year 5', value: 110, width: 100 },
]

export function ScaleSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [barsRef, barsInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="scale" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(45,27,61,0.3)_0%,transparent_60%)]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            SCALE & ROADMAP
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            From Delhi to <span className="text-gradient-gold">South Asia</span>
          </h2>
        </motion.div>

        {/* India Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-20"
        >
          <IndiaMap />
        </motion.div>

        {/* Phase table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20 overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[rgba(196,131,58,0.2)]">
                <th className="text-left p-4 text-[#C4833A] font-display font-bold">Phase</th>
                <th className="text-left p-4 text-[#C4833A] font-display font-bold">Timeline</th>
                <th className="text-right p-4 text-[#C4833A] font-display font-bold">Wards</th>
                <th className="text-right p-4 text-[#C4833A] font-display font-bold">Sensors</th>
                <th className="text-right p-4 text-[#C4833A] font-display font-bold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {roadmapPhases.map((phase, index) => (
                <motion.tr
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-[rgba(196,131,58,0.08)] hover:bg-[rgba(196,131,58,0.05)] transition-colors"
                >
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2">
                      <span 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ 
                          background: `rgba(196,131,58,${0.1 + index * 0.1})`,
                          color: '#C4833A'
                        }}
                      >
                        {phase.phase}
                      </span>
                    </span>
                  </td>
                  <td className="p-4 text-[#C8C8D8]">{phase.timeline}</td>
                  <td className="p-4 text-right font-mono text-[#F5C9A0]">{phase.wards.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono text-[#E8A85C]">{phase.sensors.toLocaleString()}</td>
                  <td className="p-4 text-right font-mono font-bold text-[#4CAF8C]">{phase.revenue}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Revenue projection chart */}
        <motion.div
          ref={barsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={barsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="vaayu-card p-8 md:p-12"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8">Revenue Projection</h3>
          
          <div className="space-y-6">
            {revenueData.map((item, index) => (
              <div key={item.year} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#C8C8D8]">{item.year}</span>
                  <span className="text-[#C4833A] font-mono font-bold">₹{item.value} Crore</span>
                </div>
                <div className="h-8 bg-[#1A1A2E] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#C4833A] to-[#E8A85C]"
                    initial={{ width: 0 }}
                    animate={barsInView ? { width: `${item.width}%` } : {}}
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
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
