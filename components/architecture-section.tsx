'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Cpu, Scale, Users, LayoutDashboard } from 'lucide-react'

const components = [
  {
    id: 'data',
    number: '01',
    title: 'Data Ingestion',
    icon: Database,
    color: '#1A5FAE',
    bullets: [
      '800 IoT sensor streams',
      'NASA MODIS satellite feeds',
      '5-minute batch ingestion',
    ],
    techStack: ['Kafka', 'AWS IoT', 'InfluxDB', 'Python'],
    research: 'Validated by: ESA Sentinel-5P Protocol',
  },
  {
    id: 'ml',
    number: '02',
    title: 'ML Engine',
    icon: Cpu,
    color: '#0B9182',
    bullets: [
      'Positive Matrix Factorization',
      'CNN-LSTM hybrid forecasting',
      'Online retraining pipeline',
    ],
    techStack: ['TensorFlow', 'PyTorch', 'Spark', 'MLflow'],
    research: 'Validated by: IIT Kanpur PMF Model',
  },
  {
    id: 'policy',
    number: '03',
    title: 'Policy Automation',
    icon: Scale,
    color: '#C4833A',
    bullets: [
      'GRAP threshold mapping',
      'Auto legal notice generation',
      'Officer GPS assignment',
    ],
    techStack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery'],
    research: 'Validated by: CPCB Guidelines 2024',
  },
  {
    id: 'citizen',
    number: '04',
    title: 'Citizen Advisory',
    icon: Users,
    color: '#7B68EE',
    bullets: [
      '6 health vulnerability profiles',
      'Multi-channel delivery',
      'Offline-first architecture',
    ],
    techStack: ['Flutter', 'FCM', 'Twilio', 'USSD'],
    research: 'Validated by: WHO Health Guidelines',
  },
  {
    id: 'admin',
    number: '05',
    title: 'Admin Dashboard',
    icon: LayoutDashboard,
    color: '#F5C9A0',
    bullets: [
      'Real-time ward monitoring',
      'Compliance tracking',
      'Impact analytics',
    ],
    techStack: ['React', 'D3.js', 'GraphQL', 'Vercel'],
    research: 'Validated by: MCD Pilot 2024',
  },
]

export function ArchitectureSection() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D14] via-[#1A1A2E]/30 to-[#0D0D14]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Technical <span className="text-gradient-gold">Architecture</span>
          </h2>
        </motion.div>

        {/* Component cards - horizontal scroll on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 lg:overflow-x-auto lg:pb-4 lg:-mx-6 lg:px-6">
          {components.map((comp, index) => {
            const Icon = comp.icon
            const isFlipped = flippedCard === comp.id

            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="lg:min-w-[280px] lg:flex-shrink-0 perspective-1000"
              >
                <motion.div
                  className="relative h-[320px] cursor-pointer preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setFlippedCard(isFlipped ? null : comp.id)}
                  data-hoverable
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front face */}
                  <div 
                    className="absolute inset-0 vaayu-card p-6 backface-hidden"
                    style={{ 
                      borderTopWidth: 3, 
                      borderTopColor: comp.color,
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${comp.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: comp.color }} />
                      </div>
                      <span className="text-[#7A7A9A] font-mono text-sm">{comp.number}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white mb-4">{comp.title}</h3>

                    <ul className="space-y-2 mb-6">
                      {comp.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-[#C8C8D8] flex items-start gap-2">
                          <span className="w-1 h-1 bg-[#C4833A] rounded-full mt-2 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {comp.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{ 
                            background: `${comp.color}20`,
                            color: comp.color 
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back face */}
                  <div 
                    className="absolute inset-0 vaayu-card p-6 flex flex-col items-center justify-center text-center backface-hidden"
                    style={{ 
                      borderTopWidth: 3, 
                      borderTopColor: comp.color,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-[#7A7A9A] text-sm mb-4">Research Validated By</div>
                    <div className="text-xl font-display font-bold text-white mb-4">
                      {comp.research.replace('Validated by: ', '')}
                    </div>
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: `${comp.color}30` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: comp.color }} />
                    </div>
                    <p className="text-[#7A7A9A] text-xs mt-4">Click to flip back</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Flow arrows connecting cards */}
        <div className="hidden lg:flex justify-center mt-8 gap-4">
          {components.slice(0, -1).map((comp, index) => (
            <motion.div
              key={`arrow-${index}`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#C4833A]/30 to-transparent" />
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#C4833A]">
                <path d="M0 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
