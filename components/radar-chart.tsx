'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const pollutants = ['PM2.5', 'PM10', 'NO₂', 'CO', 'SO₂']

const sources = [
  { 
    id: 'biomass', 
    name: 'Biomass Burning', 
    color: '#D94F4F', 
    confidence: 91,
    values: [0.85, 0.65, 0.45, 0.7, 0.55],
    description: 'Crop residue, wood, and organic matter combustion'
  },
  { 
    id: 'construction', 
    name: 'Construction Dust', 
    color: '#E07B3A', 
    confidence: 87,
    values: [0.55, 0.9, 0.25, 0.2, 0.15],
    description: 'Demolition, earthwork, and concrete mixing activities'
  },
  { 
    id: 'vehicular', 
    name: 'Vehicular', 
    color: '#7B68EE', 
    confidence: 89,
    values: [0.6, 0.5, 0.85, 0.75, 0.35],
    description: 'Exhaust from vehicles, especially diesel engines'
  },
  { 
    id: 'industrial', 
    name: 'Industrial', 
    color: '#C4833A', 
    confidence: 93,
    values: [0.7, 0.6, 0.65, 0.5, 0.9],
    description: 'Manufacturing, power plants, and factory emissions'
  },
  { 
    id: 'stubble', 
    name: 'Stubble Burning', 
    color: '#F5C9A0', 
    confidence: 86,
    values: [0.95, 0.8, 0.4, 0.85, 0.45],
    description: 'Agricultural residue burning in Punjab/Haryana'
  },
]

const pollutantInfo: Record<string, string> = {
  'PM2.5': 'Fine particles <2.5µm, penetrate deep into lungs',
  'PM10': 'Coarse particles <10µm, cause respiratory issues',
  'NO₂': 'Nitrogen dioxide from combustion, causes inflammation',
  'CO': 'Carbon monoxide, reduces oxygen delivery in blood',
  'SO₂': 'Sulfur dioxide, causes acid rain and breathing problems',
}

export function RadarChart() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const size = 300
  const center = size / 2
  const radius = size / 2 - 40
  const levels = 5

  const angleStep = (2 * Math.PI) / pollutants.length
  const startAngle = -Math.PI / 2 // Start from top

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep
    const r = radius * value
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    }
  }

  const getPolygonPoints = (values: number[]) => {
    return values.map((v, i) => {
      const point = getPoint(i, v)
      return `${point.x},${point.y}`
    }).join(' ')
  }

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {/* Source selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sources.map((source) => (
          <motion.button
            key={source.id}
            onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-display font-medium transition-all duration-300 ${
              selectedSource === source.id
                ? 'text-[#0D0D14]'
                : 'text-[#C8C8D8] bg-[#1A1A2E] border border-[rgba(196,131,58,0.12)] hover:border-[rgba(196,131,58,0.3)]'
            }`}
            style={{
              backgroundColor: selectedSource === source.id ? source.color : undefined,
              boxShadow: selectedSource === source.id ? `0 0 20px ${source.color}50` : undefined,
            }}
            data-hoverable
          >
            {source.name}
          </motion.button>
        ))}
      </div>

      {/* Chart container */}
      <div 
        ref={containerRef}
        className="relative flex justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          animate={{ 
            rotateZ: isHovering ? 3 : 0,
            scale: isHovering ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ perspective: 1000 }}
        >
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            <defs>
              {sources.map((source) => (
                <linearGradient 
                  key={`gradient-${source.id}`} 
                  id={`gradient-${source.id}`}
                  x1="0%" y1="0%" x2="100%" y2="100%"
                >
                  <stop offset="0%" stopColor={source.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={source.color} stopOpacity="0.1" />
                </linearGradient>
              ))}
              <filter id="glow-radar">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background circles */}
            {[...Array(levels)].map((_, i) => (
              <motion.circle
                key={`level-${i}`}
                cx={center}
                cy={center}
                r={(radius / levels) * (i + 1)}
                fill="none"
                stroke="rgba(196,131,58,0.1)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}

            {/* Axes */}
            {pollutants.map((pollutant, i) => {
              const endPoint = getPoint(i, 1)
              return (
                <g key={pollutant}>
                  <motion.line
                    x1={center}
                    y1={center}
                    x2={endPoint.x}
                    y2={endPoint.y}
                    stroke="rgba(196,131,58,0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  />
                  
                  {/* Axis labels */}
                  <motion.text
                    x={getPoint(i, 1.15).x}
                    y={getPoint(i, 1.15).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-sm font-mono cursor-pointer transition-colors duration-200 ${
                      hoveredAxis === pollutant ? 'fill-[#C4833A]' : 'fill-[#C8C8D8]'
                    }`}
                    onMouseEnter={() => setHoveredAxis(pollutant)}
                    onMouseLeave={() => setHoveredAxis(null)}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  >
                    {pollutant}
                  </motion.text>
                </g>
              )
            })}

            {/* Source polygons */}
            {sources.map((source, sourceIndex) => {
              const isSelected = selectedSource === source.id
              const opacity = selectedSource 
                ? (isSelected ? 0.6 : 0.05)
                : 0.3

              return (
                <motion.polygon
                  key={source.id}
                  points={getPolygonPoints(source.values)}
                  fill={`url(#gradient-${source.id})`}
                  stroke={source.color}
                  strokeWidth={isSelected ? 2 : 1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { 
                    scale: 1, 
                    opacity,
                    strokeWidth: isSelected ? 2 : 1,
                  } : {}}
                  transition={{ 
                    delay: 0.5 + sourceIndex * 0.1, 
                    duration: 0.6,
                    opacity: { duration: 0.3 }
                  }}
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    filter: isSelected ? 'url(#glow-radar)' : undefined,
                  }}
                />
              )
            })}

            {/* Center dot */}
            <motion.circle
              cx={center}
              cy={center}
              r={4}
              fill="#C4833A"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Axis tooltip */}
        <AnimatePresence>
          {hoveredAxis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 glass rounded-lg px-4 py-2 text-sm text-center max-w-xs"
            >
              <span className="text-[#C4833A] font-bold">{hoveredAxis}:</span>{' '}
              <span className="text-[#C8C8D8]">{pollutantInfo[hoveredAxis]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected source info */}
      <AnimatePresence mode="wait">
        {selectedSource && (
          <motion.div
            key={selectedSource}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 text-center"
          >
            {(() => {
              const source = sources.find(s => s.id === selectedSource)
              if (!source) return null
              return (
                <div className="vaayu-card inline-block px-8 py-4 animate-pulse-glow">
                  <div className="text-2xl font-display font-bold mb-1" style={{ color: source.color }}>
                    {source.name}
                  </div>
                  <div className="text-[#7A7A9A] text-sm mb-2">{source.description}</div>
                  <div className="text-[#4CAF8C] font-mono font-bold">
                    {source.confidence}% confidence
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
