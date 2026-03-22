'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const phases = [
  { 
    id: 1, 
    name: 'Phase 1: Delhi', 
    timeline: '0-6 months', 
    wards: 272, 
    sensors: 800,
    description: 'Full coverage of all 272 Delhi wards',
  },
  { 
    id: 2, 
    name: 'Phase 2: NCR', 
    timeline: '6-12 months', 
    wards: 850, 
    sensors: 2500,
    description: 'Expansion to NCR states (Haryana, UP border)',
  },
  { 
    id: 3, 
    name: 'Phase 3: NCAP Cities', 
    timeline: '12-24 months', 
    wards: 2500, 
    sensors: 7500,
    description: 'Top 10 NCAP non-attainment cities',
  },
  { 
    id: 4, 
    name: 'Phase 4: South Asia', 
    timeline: '24-36 months', 
    wards: 5000, 
    sensors: 15000,
    description: 'Bangladesh, Nepal, and pan-India coverage',
  },
]

// NCAP cities coordinates (approximate)
const ncapCities = [
  { name: 'Mumbai', x: 73, y: 100 },
  { name: 'Chennai', x: 80, y: 130 },
  { name: 'Kolkata', x: 88, y: 85 },
  { name: 'Ahmedabad', x: 72, y: 90 },
  { name: 'Lucknow', x: 81, y: 75 },
  { name: 'Kanpur', x: 80, y: 78 },
  { name: 'Varanasi', x: 83, y: 82 },
  { name: 'Patna', x: 85, y: 78 },
  { name: 'Agra', x: 78, y: 75 },
  { name: 'Jaipur', x: 76, y: 78 },
]

export function IndiaMap() {
  const [activePhase, setActivePhase] = useState(1)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  // Auto-advance phases for demo
  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActivePhase(prev => (prev % 4) + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView])

  const delhiX = 77
  const delhiY = 72

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {/* Phase selector slider */}
      <div className="mb-8">
        <input
          type="range"
          min="1"
          max="4"
          value={activePhase}
          onChange={(e) => setActivePhase(Number(e.target.value))}
          className="w-full h-2 bg-[#1A1A2E] rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C4833A 0%, #C4833A ${(activePhase / 4) * 100}%, #1A1A2E ${(activePhase / 4) * 100}%, #1A1A2E 100%)`
          }}
        />
        <div className="flex justify-between mt-2 text-xs text-[#7A7A9A]">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`transition-colors ${activePhase >= phase.id ? 'text-[#C4833A]' : ''}`}
              data-hoverable
            >
              {phase.timeline}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative aspect-[4/5] max-h-[500px]">
        <svg viewBox="0 0 150 180" className="w-full h-full">
          <defs>
            <filter id="glow-map">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="flightPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4833A" stopOpacity="0" />
              <stop offset="50%" stopColor="#C4833A" stopOpacity="1" />
              <stop offset="100%" stopColor="#C4833A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* India outline (simplified) */}
          <motion.path
            d="M75 15 
               C85 15, 95 20, 100 30 
               L105 40 L110 50 L108 60 L105 70
               L100 75 L95 85 L90 100 L85 115
               L80 130 L75 145 L70 150 L65 148
               L60 140 L55 130 L50 115 L48 100
               L50 85 L55 70 L60 55 L65 40
               L70 25 L75 15Z"
            fill="none"
            stroke="rgba(196,131,58,0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
          />

          {/* Phase 4: South Asia border (dotted) */}
          <AnimatePresence>
            {activePhase >= 4 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Nepal */}
                <motion.ellipse
                  cx={80}
                  cy={65}
                  rx={12}
                  ry={5}
                  fill="none"
                  stroke="#C4833A"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
                {/* Bangladesh */}
                <motion.ellipse
                  cx={92}
                  cy={85}
                  rx={8}
                  ry={10}
                  fill="none"
                  stroke="#C4833A"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Phase 3: NCAP cities */}
          <AnimatePresence>
            {activePhase >= 3 && ncapCities.map((city, index) => (
              <motion.g
                key={city.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Flight path from Delhi */}
                <motion.path
                  d={`M ${delhiX} ${delhiY} Q ${(delhiX + city.x) / 2} ${Math.min(delhiY, city.y) - 15} ${city.x} ${city.y}`}
                  fill="none"
                  stroke="#C4833A"
                  strokeWidth="0.5"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="3"
                  fill="#E8A85C"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                />
              </motion.g>
            ))}
          </AnimatePresence>

          {/* Phase 2: NCR highlight */}
          <AnimatePresence>
            {activePhase >= 2 && (
              <motion.circle
                cx={delhiX}
                cy={delhiY}
                r={12}
                fill="rgba(232,168,92,0.2)"
                stroke="#E8A85C"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* Phase 1: Delhi (always visible) */}
          <motion.g
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {/* Pulsing ring */}
            <motion.circle
              cx={delhiX}
              cy={delhiY}
              r={6}
              fill="none"
              stroke="#C4833A"
              strokeWidth="2"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Center dot */}
            <circle
              cx={delhiX}
              cy={delhiY}
              r={5}
              fill="#C4833A"
              filter="url(#glow-map)"
            />
            <text
              x={delhiX}
              y={delhiY - 10}
              textAnchor="middle"
              fill="#C4833A"
              fontSize="5"
              fontWeight="bold"
            >
              DELHI
            </text>
          </motion.g>
        </svg>

        {/* Hovered city tooltip */}
        <AnimatePresence>
          {hoveredCity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 right-4 glass rounded-lg px-4 py-2 text-sm"
            >
              <span className="text-[#C4833A] font-bold">{hoveredCity}</span>
              <span className="text-[#7A7A9A] ml-2">NCAP City</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phase info card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 vaayu-card p-6 text-center"
        >
          {(() => {
            const phase = phases.find(p => p.id === activePhase)
            if (!phase) return null
            return (
              <>
                <h4 className="text-xl font-display font-bold text-[#C4833A] mb-2">
                  {phase.name}
                </h4>
                <p className="text-[#C8C8D8] mb-4">{phase.description}</p>
                <div className="flex justify-center gap-8 text-sm">
                  <div>
                    <div className="text-2xl font-mono font-bold text-[#F5C9A0]">{phase.wards.toLocaleString()}</div>
                    <div className="text-[#7A7A9A]">Wards</div>
                  </div>
                  <div>
                    <div className="text-2xl font-mono font-bold text-[#E8A85C]">{phase.sensors.toLocaleString()}</div>
                    <div className="text-[#7A7A9A]">Sensors</div>
                  </div>
                </div>
              </>
            )
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
