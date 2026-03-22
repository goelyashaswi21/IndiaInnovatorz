'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const pipelineSteps = [
  { id: 1, name: 'DETECT', color: '#1A5FAE', description: 'IoT sensors detect pollution spike in ward', research: 'NASA MODIS validation' },
  { id: 2, name: 'ATTRIBUTE', color: '#0B9182', description: 'ML identifies source: construction, vehicular, industrial', research: 'IIT Kanpur PMF model' },
  { id: 3, name: 'LOCATE', color: '#0B9182', description: 'GPS pinpoints exact violation location', research: 'Sentinel-5P geolocation' },
  { id: 4, name: 'LEGISLATE', color: '#C4833A', description: 'System generates appropriate legal notice', research: 'CPCB Guidelines 2024' },
  { id: 5, name: 'ASSIGN', color: '#C4833A', description: 'Officer assigned based on GPS proximity', research: 'Dijkstra routing algorithm' },
  { id: 6, name: 'TRACK', color: '#D94F4F', description: 'Real-time compliance monitoring', research: 'Chain of custody logs' },
  { id: 7, name: 'MEASURE', color: '#4CAF8C', description: 'Post-action AQI improvement quantified', research: 'Causal impact analysis' },
  { id: 8, name: 'RETRAIN', color: '#7B68EE', description: 'Outcomes feed back to improve ML models', research: 'Online learning pipeline' },
]

export function GovernancePipeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [pulseIndex, setPulseIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const svgRef = useRef<SVGSVGElement>(null)

  // Auto-play pulse animation
  useEffect(() => {
    if (!isAutoPlaying || !inView) return
    
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % pipelineSteps.length)
    }, 750)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, inView])

  const handleStepClick = (stepId: number) => {
    setIsAutoPlaying(false)
    setActiveStep(activeStep === stepId ? null : stepId)
  }

  // Calculate positions in a circular arrangement
  const centerX = 300
  const centerY = 200
  const radiusX = 250
  const radiusY = 150

  const getPosition = (index: number) => {
    const angle = (index / pipelineSteps.length) * 2 * Math.PI - Math.PI / 2
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle),
    }
  }

  // Generate path between nodes
  const getPath = () => {
    let path = ''
    pipelineSteps.forEach((_, index) => {
      const pos = getPosition(index)
      if (index === 0) {
        path += `M ${pos.x} ${pos.y}`
      } else {
        path += ` L ${pos.x} ${pos.y}`
      }
    })
    // Close the loop
    const firstPos = getPosition(0)
    path += ` L ${firstPos.x} ${firstPos.y}`
    return path
  }

  // Feedback arrow from step 8 to step 2
  const getFeedbackPath = () => {
    const step8 = getPosition(7)
    const step2 = getPosition(1)
    const controlX = centerX - 80
    const controlY = centerY - 60
    return `M ${step8.x} ${step8.y} Q ${controlX} ${controlY} ${step2.x} ${step2.y}`
  }

  return (
    <div ref={ref} className="w-full">
      {/* Desktop circular layout */}
      <div className="hidden lg:block relative">
        <svg
          ref={svgRef}
          viewBox="0 0 600 400"
          className="w-full max-w-4xl mx-auto"
        >
          <defs>
            <filter id="glow-pipeline">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4833A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#C4833A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C4833A" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection path */}
          <motion.path
            d={getPath()}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="animate-dash"
          />

          {/* Feedback arrow */}
          <motion.path
            d={getFeedbackPath()}
            fill="none"
            stroke="#7B68EE"
            strokeWidth="2"
            strokeDasharray="6 3"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 2 }}
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#7B68EE" />
            </marker>
          </defs>

          {/* Traveling pulse */}
          {isAutoPlaying && inView && (
            <motion.circle
              r="8"
              fill="#C4833A"
              filter="url(#glow-pipeline)"
              initial={getPosition(0)}
              animate={getPosition(pulseIndex)}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )}

          {/* Step nodes */}
          {pipelineSteps.map((step, index) => {
            const pos = getPosition(index)
            const isActive = activeStep === step.id
            const isPulsing = pulseIndex === index && isAutoPlaying

            return (
              <g 
                key={step.id} 
                onClick={() => handleStepClick(step.id)}
                className="cursor-pointer"
                data-hoverable
              >
                {/* Outer ring for active/pulse */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={30}
                  fill="none"
                  stroke={step.color}
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { 
                    scale: isActive || isPulsing ? 1.3 : 1, 
                    opacity: isActive || isPulsing ? 0.5 : 0 
                  } : {}}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />

                {/* Main node */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={24}
                  fill={step.color}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.4, type: 'spring' }}
                  style={{ 
                    filter: isActive || isPulsing ? `drop-shadow(0 0 15px ${step.color})` : undefined,
                    transformOrigin: `${pos.x}px ${pos.y}px`
                  }}
                />

                {/* Step number */}
                <motion.text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="#0D0D14"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {step.id}
                </motion.text>

                {/* Step name */}
                <motion.text
                  x={pos.x}
                  y={pos.y + 50}
                  textAnchor="middle"
                  fill={step.color}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="var(--font-display)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {step.name}
                </motion.text>
              </g>
            )
          })}

          {/* Feedback label */}
          <motion.text
            x={centerX - 100}
            y={centerY - 40}
            fill="#7B68EE"
            fontSize="9"
            fontFamily="var(--font-mono)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2.5 }}
          >
            ↩ feeds back to ML
          </motion.text>
        </svg>
      </div>

      {/* Mobile vertical layout */}
      <div className="lg:hidden space-y-4">
        {pipelineSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleStepClick(step.id)}
            className="vaayu-card p-4 relative"
            style={{ borderLeftWidth: 4, borderLeftColor: step.color }}
            data-hoverable
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#0D0D14] font-mono font-bold"
                style={{ backgroundColor: step.color }}
              >
                {step.id}
              </div>
              <div>
                <div className="font-display font-bold" style={{ color: step.color }}>{step.name}</div>
                <div className="text-sm text-[#7A7A9A]">{step.description}</div>
              </div>
            </div>

            {/* Connecting line */}
            {index < pipelineSteps.length - 1 && (
              <div className="absolute -bottom-4 left-6 w-px h-4 bg-gradient-to-b from-[rgba(196,131,58,0.3)] to-transparent" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Active step detail card */}
      <AnimatePresence>
        {activeStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 max-w-md mx-auto"
          >
            {(() => {
              const step = pipelineSteps.find(s => s.id === activeStep)
              if (!step) return null
              return (
                <div 
                  className="vaayu-card p-6"
                  style={{ 
                    borderColor: `${step.color}40`,
                    boxShadow: `0 0 30px ${step.color}20`
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{ background: `${step.color}30`, color: step.color }}
                    >
                      STEP {step.id}
                    </span>
                    <span className="font-display font-bold text-white">{step.name}</span>
                  </div>
                  <p className="text-[#C8C8D8] mb-3">{step.description}</p>
                  <div className="text-xs text-[#7A7A9A] flex items-center gap-2">
                    <span className="text-[#4CAF8C]">Research backing:</span>
                    <span>{step.research}</span>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume auto-play button */}
      {!isAutoPlaying && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setIsAutoPlaying(true)
            setActiveStep(null)
          }}
          className="mt-6 mx-auto block text-sm text-[#7A7A9A] hover:text-[#C4833A] transition-colors"
          data-hoverable
        >
          ▶ Resume animation
        </motion.button>
      )}
    </div>
  )
}
