'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RadarChart } from './radar-chart'
import { Wifi, Brain, Gavel, ChevronRight } from 'lucide-react'

const layers = [
  {
    id: 'sense',
    number: 'L1',
    title: 'SENSE IT',
    color: '#1A5FAE',
    icon: Wifi,
    headline: '800 IoT nodes. PMS5003 sensors. NASA satellite. Every 5 minutes.',
    specs: [
      { label: 'Hardware', value: 'PMS5003 + BME280 + ESP32-S3' },
      { label: 'Coverage', value: '272 wards, 3 sensors per ward' },
      { label: 'Frequency', value: '5-minute real-time updates' },
      { label: 'Satellite', value: 'NASA MODIS + Sentinel-5P integration' },
    ],
    techStack: ['AWS IoT', 'InfluxDB', 'Kafka', 'Python'],
  },
  {
    id: 'understand',
    number: 'L2',
    title: 'UNDERSTAND IT',
    color: '#0B9182',
    icon: Brain,
    headline: '5 ML models. Chemical fingerprinting. 87% source accuracy. 12-hour forecasts.',
    specs: [
      { label: 'Models', value: 'PMF, CNN-LSTM, Random Forest, XGBoost, SHAP' },
      { label: 'Attribution', value: '5 pollution sources identified' },
      { label: 'Accuracy', value: '87% source attribution confidence' },
      { label: 'Forecasting', value: '12-hour AQI prediction window' },
    ],
    techStack: ['TensorFlow', 'PyTorch', 'Spark', 'MLflow'],
  },
  {
    id: 'act',
    number: 'L3',
    title: 'ACT ON IT',
    color: '#C4833A',
    icon: Gavel,
    headline: 'Auto-legal notices. Officer GPS assignment. 6 health profiles. 272 wards. <15 min.',
    specs: [
      { label: 'Automation', value: 'Legal notice generation in <15 minutes' },
      { label: 'Assignment', value: 'GPS-based officer routing' },
      { label: 'Health Profiles', value: '6 vulnerability categories' },
      { label: 'Channels', value: 'SMS, WhatsApp, App, Email, Sirens' },
    ],
    techStack: ['FastAPI', 'React', 'Flutter', 'PostgreSQL'],
  },
]

export function SolutionSection() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="solution" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/50 via-[#0D0D14] to-[#0D0D14]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            THE SOLUTION
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Three Layers of <span className="text-gradient-gold">Intelligence</span>
          </h2>
        </motion.div>

        {/* Layers */}
        <div className="space-y-6 mb-20">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            const isExpanded = expandedLayer === layer.id

            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <motion.div
                  className={`vaayu-card relative overflow-hidden cursor-pointer`}
                  style={{ borderLeftWidth: 4, borderLeftColor: layer.color }}
                  onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                  whileHover={{ scale: 1.01 }}
                  data-hoverable
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    style={{
                      background: `radial-gradient(ellipse at left, ${layer.color}15 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-6">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                        style={{ 
                          background: `${layer.color}20`,
                          boxShadow: `0 0 20px ${layer.color}30`
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: layer.color }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                            style={{ background: `${layer.color}30`, color: layer.color }}
                          >
                            {layer.number}
                          </span>
                          <h3 
                            className="text-xl md:text-2xl font-display font-bold"
                            style={{ color: layer.color }}
                          >
                            {layer.title}
                          </h3>
                        </div>
                        <p className="text-[#C8C8D8] text-lg">{layer.headline}</p>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-6 h-6 text-[#7A7A9A]" />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-[rgba(196,131,58,0.12)]">
                            {/* Specs grid */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              {layer.specs.map((spec) => (
                                <div key={spec.label} className="flex gap-3">
                                  <span className="text-[#7A7A9A] text-sm shrink-0">{spec.label}:</span>
                                  <span className="text-white text-sm font-medium">{spec.value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2">
                              {layer.techStack.map((tech) => (
                                <span 
                                  key={tech}
                                  className="px-3 py-1 rounded-full text-xs font-mono"
                                  style={{ 
                                    background: `${layer.color}25`,
                                    color: layer.color 
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Connecting line to next layer */}
                  {index < layers.length - 1 && (
                    <svg 
                      className="absolute -bottom-6 left-9 w-0.5 h-6 overflow-visible"
                      viewBox="0 0 2 24"
                    >
                      <line 
                        x1="1" y1="0" x2="1" y2="24"
                        stroke={layer.color}
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="animate-dash"
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Radar chart for L2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="vaayu-card p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <span 
              className="text-xs font-mono font-bold px-2 py-0.5 rounded"
              style={{ background: '#0B918230', color: '#0B9182' }}
            >
              L2 VISUALIZED
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-3">
              Pollution Source Attribution Radar
            </h3>
            <p className="text-[#7A7A9A] mt-2">
              Select a source to see its chemical fingerprint across pollutant types
            </p>
          </div>
          <RadarChart />
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
