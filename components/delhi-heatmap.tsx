'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WardData {
  id: number
  name: string
  aqi: number
  source: string
  sourceIcon: string
  confidence: number
  x: number
  y: number
}

const initialWards: WardData[] = [
  { id: 1, name: 'Anand Vihar', aqi: 341, source: 'Construction Dust', sourceIcon: '🏗️', confidence: 89, x: 75, y: 25 },
  { id: 2, name: 'Rohini Sector 16', aqi: 189, source: 'Vehicular', sourceIcon: '🚗', confidence: 92, x: 35, y: 20 },
  { id: 3, name: 'Okhla Phase 2', aqi: 267, source: 'Industrial', sourceIcon: '🏭', confidence: 87, x: 65, y: 75 },
  { id: 4, name: 'Chandni Chowk', aqi: 312, source: 'Biomass Burning', sourceIcon: '🔥', confidence: 91, x: 50, y: 45 },
  { id: 5, name: 'R.K. Puram', aqi: 98, source: 'Clean', sourceIcon: '🌿', confidence: 95, x: 40, y: 65 },
  { id: 6, name: 'Mustafabad', aqi: 287, source: 'Biomass Burning', sourceIcon: '🔥', confidence: 88, x: 60, y: 30 },
  { id: 7, name: 'Karawal Nagar', aqi: 224, source: 'Stubble Burning', sourceIcon: '🌾', confidence: 86, x: 70, y: 15 },
  { id: 8, name: 'Dwarka Sector 10', aqi: 156, source: 'Vehicular', sourceIcon: '🚗', confidence: 90, x: 15, y: 60 },
  { id: 9, name: 'Shahdara', aqi: 298, source: 'Industrial', sourceIcon: '🏭', confidence: 85, x: 80, y: 40 },
  { id: 10, name: 'Wazirpur', aqi: 334, source: 'Industrial', sourceIcon: '🏭', confidence: 93, x: 45, y: 30 },
  { id: 11, name: 'Sarita Vihar', aqi: 178, source: 'Vehicular', sourceIcon: '🚗', confidence: 89, x: 70, y: 70 },
  { id: 12, name: 'Tughlakabad', aqi: 241, source: 'Construction Dust', sourceIcon: '🏗️', confidence: 84, x: 60, y: 80 },
  { id: 13, name: 'Burari', aqi: 203, source: 'Biomass Burning', sourceIcon: '🔥', confidence: 87, x: 55, y: 15 },
  { id: 14, name: 'Mehrauli', aqi: 134, source: 'Vehicular', sourceIcon: '🚗', confidence: 91, x: 35, y: 80 },
  { id: 15, name: 'Bawana', aqi: 378, source: 'Industrial', sourceIcon: '🏭', confidence: 94, x: 30, y: 10 },
  { id: 16, name: 'Narela', aqi: 289, source: 'Construction Dust', sourceIcon: '🏗️', confidence: 86, x: 40, y: 5 },
  { id: 17, name: 'Mundka', aqi: 311, source: 'Industrial', sourceIcon: '🏭', confidence: 88, x: 20, y: 35 },
  { id: 18, name: 'Vasant Kunj', aqi: 88, source: 'Clean', sourceIcon: '🌿', confidence: 96, x: 30, y: 70 },
  { id: 19, name: 'Lajpat Nagar', aqi: 167, source: 'Vehicular', sourceIcon: '🚗', confidence: 90, x: 55, y: 55 },
  { id: 20, name: 'Patel Nagar', aqi: 219, source: 'Vehicular', sourceIcon: '🚗', confidence: 89, x: 40, y: 45 },
  { id: 21, name: 'Mayur Vihar', aqi: 245, source: 'Vehicular', sourceIcon: '🚗', confidence: 87, x: 85, y: 55 },
  { id: 22, name: 'Janakpuri', aqi: 176, source: 'Vehicular', sourceIcon: '🚗', confidence: 91, x: 20, y: 50 },
  { id: 23, name: 'Pitampura', aqi: 198, source: 'Vehicular', sourceIcon: '🚗', confidence: 88, x: 35, y: 25 },
  { id: 24, name: 'Najafgarh', aqi: 267, source: 'Industrial', sourceIcon: '🏭', confidence: 85, x: 10, y: 55 },
]

const getAQIColor = (aqi: number): string => {
  if (aqi < 100) return '#00FF88'
  if (aqi < 200) return '#00D4FF'
  if (aqi < 300) return '#FF6B35'
  return '#FF3D3D'
}

const getAQICategory = (aqi: number): string => {
  if (aqi < 100) return 'Good'
  if (aqi < 200) return 'Moderate'
  if (aqi < 300) return 'Poor'
  return 'Severe'
}

function createDeterministicRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

const ambientParticles = Array.from({ length: 20 }, (_, i) => {
  const rand = createDeterministicRandom(i + 1)
  return {
    x: `${rand() * 100}%`,
    y: `${rand() * 100}%`,
    duration: rand() * 10 + 10,
    delay: rand() * 5,
  }
})

export function DelhiHeatmap() {
  const [wards, setWards] = useState(initialWards)
  const [hoveredWard, setHoveredWard] = useState<WardData | null>(null)
  const [alertWard, setAlertWard] = useState<number>(15) // Bawana starts as alert
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Simulate live AQI changes
  useEffect(() => {
    const interval = setInterval(() => {
      setWards(prev => {
        const newWards = [...prev]
        const indicesToChange = [
          Math.floor(Math.random() * newWards.length),
          Math.floor(Math.random() * newWards.length),
        ]
        indicesToChange.forEach(index => {
          const change = Math.floor(Math.random() * 60) - 30
          newWards[index] = {
            ...newWards[index],
            aqi: Math.max(50, Math.min(400, newWards[index].aqi + change))
          }
        })
        return newWards
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Rotate alert ward
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertWard(prev => {
        const highAQIWards = wards.filter(w => w.aqi > 300)
        if (highAQIWards.length > 0) {
          const randomIndex = Math.floor(Math.random() * highAQIWards.length)
          return highAQIWards[randomIndex].id
        }
        return prev
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [wards])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square max-w-lg mx-auto"
      onMouseMove={handleMouseMove}
    >
      {/* Background glow - cyan/magenta blend */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#00D4FF]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-[#FF00FF]/5 via-transparent to-transparent translate-x-1/4" />
      </div>
      
      {/* Live badge */}
      <div className="absolute top-4 right-4 live-badge z-20">
        LIVE
      </div>

      {/* Map container */}
      <div className="relative w-full h-full">
        {/* Delhi outline SVG */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          
          {/* Delhi border approximation */}
          <path
            d="M50 5 L75 15 L90 30 L95 50 L90 70 L75 85 L60 90 L40 90 L25 85 L10 70 L5 50 L10 30 L25 15 Z"
            fill="url(#mapGlow)"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            className="animate-dash"
          />
        </svg>

        {/* Ward hexagons */}
        {wards.map((ward, index) => {
          const isAlert = ward.id === alertWard
          const color = getAQIColor(ward.aqi)
          
          return (
            <motion.div
              key={ward.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.05, 
                duration: 0.5,
                type: 'spring',
                stiffness: 200
              }}
              className={`absolute cursor-pointer group ${isAlert ? 'z-10' : 'z-0'}`}
              style={{
                left: `${ward.x}%`,
                top: `${ward.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={() => setHoveredWard(ward)}
              onMouseLeave={() => setHoveredWard(null)}
              data-hoverable
            >
              {/* Hex shape */}
              <motion.div
                animate={{
                  scale: isAlert ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isAlert ? Infinity : 0,
                }}
                className={`relative ${isAlert ? 'animate-alert-pulse' : ''}`}
              >
                <svg width="36" height="40" viewBox="0 0 36 40" className="drop-shadow-lg">
                  <motion.path
                    d="M18 0 L36 10 L36 30 L18 40 L0 30 L0 10 Z"
                    fill={color}
                    animate={{ fill: color }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="transition-all duration-800"
                    style={{
                      filter: `drop-shadow(0 0 ${isAlert ? '15px' : '8px'} ${color}80)`
                    }}
                  />
                  <text
                    x="18"
                    y="24"
                    textAnchor="middle"
                    fill="#0D0D14"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="var(--font-mono)"
                  >
                    {ward.aqi}
                  </text>
                </svg>
                
                {/* Pulse ring for alert */}
                {isAlert && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredWard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute z-50 pointer-events-none"
              style={{
                left: mousePos.x,
                top: mousePos.y - 120,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="data-panel rounded-xl p-4 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-white">{hoveredWard.name}</span>
                  <span 
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ 
                      background: `${getAQIColor(hoveredWard.aqi)}20`,
                      color: getAQIColor(hoveredWard.aqi)
                    }}
                  >
                    {getAQICategory(hoveredWard.aqi)}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6A8090]">AQI</span>
                    <span className="font-mono font-bold" style={{ color: getAQIColor(hoveredWard.aqi) }}>
                      {hoveredWard.aqi}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6A8090]">Source</span>
                    <span className="text-white">{hoveredWard.sourceIcon} {hoveredWard.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A8090]">Confidence</span>
                    <span className="text-[#00FF88] font-mono">{hoveredWard.confidence}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient particles - cyan and magenta mix */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ambientParticles.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-[#00D4FF]/40' : i % 3 === 1 ? 'bg-[#FF00FF]/30' : 'bg-[#00FF88]/30'}`}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, '-100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
