'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Thermometer, Map, Wheat } from 'lucide-react'

const intelligenceFeatures = [
  {
    id: 'inversion',
    icon: Thermometer,
    title: 'Temperature Inversion Detection',
    color: '#1A5FAE',
    headline: "Delhi's winter boundary layer collapses to 100-200m",
    bullets: [
      'Real-time atmospheric boundary layer monitoring',
      'AQI amplification factor up to 4× during inversions',
      'No existing system accounts for this phenomenon',
      'Predictive alerts 6 hours before inversion events',
    ],
  },
  {
    id: 'informal',
    icon: Map,
    title: 'Informal Source Mapping',
    color: '#0B9182',
    headline: 'We map the invisible polluters',
    bullets: [
      '~3,000 illegal construction sites tracked',
      '~150,000 coal street vendors mapped',
      'All research papers use only formal-sector data',
      'Ground-truth validation with field surveys',
    ],
  },
  {
    id: 'mandi',
    icon: Wheat,
    title: 'Mandi Grain Arrival Predictor',
    color: '#C4833A',
    headline: 'Grain arrival = 48-hour stubble burn predictor',
    bullets: [
      'Mandi arrival data as leading indicator',
      'Festival calendar integrated as ML feature',
      'Cross-state CAQM enforcement triggers',
      '72% accuracy on stubble burning prediction',
    ],
  },
]

export function IntelligenceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="intelligence" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-0 hex-grid-bg opacity-20" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            INDIA-SPECIFIC INTELLIGENCE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            What No Research Paper <span className="text-gradient-gold">Models</span>
          </h2>
          <p className="text-xl text-[#7A7A9A] max-w-2xl mx-auto">
            The edge that comes from understanding India&apos;s unique pollution dynamics
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="space-y-8">
          {intelligenceFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="vaayu-card p-8 relative overflow-hidden group"
                style={{ borderLeftWidth: 4, borderLeftColor: feature.color }}
                data-hoverable
              >
                {/* Shimmer effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.color}10, transparent)`,
                    animation: 'shimmer 2s infinite',
                  }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row gap-8">
                  {/* Icon and title */}
                  <div className="lg:w-1/3">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ 
                        background: `${feature.color}20`,
                        boxShadow: `0 0 30px ${feature.color}20`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    <h3 
                      className="text-2xl font-display font-bold mb-3"
                      style={{ color: feature.color }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#C8C8D8] text-lg">{feature.headline}</p>
                  </div>

                  {/* Details */}
                  <div className="lg:w-2/3">
                    <ul className="grid md:grid-cols-2 gap-4">
                      {feature.bullets.map((bullet, bIndex) => (
                        <motion.li
                          key={bullet}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: index * 0.2 + bIndex * 0.1 + 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: `${feature.color}20` }}
                          >
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: feature.color }}
                            />
                          </div>
                          <span className="text-[#C8C8D8]">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Decorative element */}
                <div 
                  className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: feature.color }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
