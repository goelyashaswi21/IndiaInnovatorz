'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TickerItem {
  id: number
  ward: string
  pm25: number
  aqi: number
  source: string
  sourceIcon: string
}

const tickerData: TickerItem[] = [
  { id: 1, ward: 'Anand Vihar', pm25: 285, aqi: 341, source: 'Construction', sourceIcon: '🏗️' },
  { id: 2, ward: 'Rohini Sector 16', pm25: 142, aqi: 189, source: 'Vehicular', sourceIcon: '🚗' },
  { id: 3, ward: 'Okhla Phase 2', pm25: 198, aqi: 267, source: 'Industrial', sourceIcon: '🏭' },
  { id: 4, ward: 'Chandni Chowk', pm25: 256, aqi: 312, source: 'Biomass', sourceIcon: '🔥' },
  { id: 5, ward: 'R.K. Puram', pm25: 67, aqi: 98, source: 'Clean', sourceIcon: '🌿' },
  { id: 6, ward: 'Mustafabad', pm25: 221, aqi: 287, source: 'Biomass', sourceIcon: '🔥' },
  { id: 7, ward: 'Karawal Nagar', pm25: 178, aqi: 224, source: 'Stubble', sourceIcon: '🌾' },
  { id: 8, ward: 'Dwarka', pm25: 112, aqi: 156, source: 'Vehicular', sourceIcon: '🚗' },
  { id: 9, ward: 'Shahdara', pm25: 234, aqi: 298, source: 'Industrial', sourceIcon: '🏭' },
  { id: 10, ward: 'Wazirpur', pm25: 278, aqi: 334, source: 'Industrial', sourceIcon: '🏭' },
  { id: 11, ward: 'Sarita Vihar', pm25: 132, aqi: 178, source: 'Vehicular', sourceIcon: '🚗' },
  { id: 12, ward: 'Tughlakabad', pm25: 189, aqi: 241, source: 'Construction', sourceIcon: '🏗️' },
  { id: 13, ward: 'Burari', pm25: 156, aqi: 203, source: 'Biomass', sourceIcon: '🔥' },
  { id: 14, ward: 'Mehrauli', pm25: 98, aqi: 134, source: 'Vehicular', sourceIcon: '🚗' },
  { id: 15, ward: 'Bawana', pm25: 312, aqi: 378, source: 'Industrial', sourceIcon: '🏭' },
  { id: 16, ward: 'Narela', pm25: 223, aqi: 289, source: 'Construction', sourceIcon: '🏗️' },
  { id: 17, ward: 'Mundka', pm25: 254, aqi: 311, source: 'Industrial', sourceIcon: '🏭' },
  { id: 18, ward: 'Vasant Kunj', pm25: 56, aqi: 88, source: 'Clean', sourceIcon: '🌿' },
  { id: 19, ward: 'Lajpat Nagar', pm25: 123, aqi: 167, source: 'Vehicular', sourceIcon: '🚗' },
  { id: 20, ward: 'Patel Nagar', pm25: 167, aqi: 219, source: 'Vehicular', sourceIcon: '🚗' },
]

const getAQIColor = (aqi: number): string => {
  if (aqi < 100) return '#00FF88'
  if (aqi < 200) return '#00D4FF'
  if (aqi < 300) return '#FF6B35'
  return '#FF3D3D'
}

export function LiveTicker() {
  const [alertIndex, setAlertIndex] = useState<number | null>(null)
  const items = [...tickerData, ...tickerData] // Duplicate for seamless loop

  // Simulate random spike alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tickerData.length)
      setAlertIndex(randomIndex)
      setTimeout(() => setAlertIndex(null), 2000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-[#0A1014]/80 backdrop-blur-md border-t border-b border-[rgba(0,212,255,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-[rgba(0,212,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="live-badge">LIVE WARD FEED</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6A8090]">
          <span className="font-mono text-[#00D4FF]">272</span>
          <span>WARDS MONITORED</span>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative py-3">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {items.map((item, index) => {
            const isAlert = alertIndex === (index % tickerData.length)
            const color = getAQIColor(item.aqi)
            
            return (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-4 px-4"
              >
                <AnimatePresence>
                  {isAlert && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-xs font-bold text-[#FF3D3D] bg-[#FF3D3D]/20 px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      <span className="animate-pulse">&#x26A1;</span> SPIKE
                    </motion.span>
                  )}
                </AnimatePresence>
                
                <span 
                  className={`font-display font-bold transition-colors duration-200 ${isAlert ? 'text-white' : 'text-[#B8C8D8]'}`}
                  style={{ color: isAlert ? '#FFFFFF' : color }}
                >
                  {item.ward}
                </span>
                
                <span className="text-[#6A8090] text-sm">
                  PM2.5: <span className="font-mono" style={{ color }}>{item.pm25}</span> µg/m³
                </span>
                
                <span className="text-sm">{item.sourceIcon}</span>
                
                <span className="text-[#6A8090] text-sm">
                  AQI: <span className="font-mono font-bold" style={{ color }}>{item.aqi}</span>
                </span>
                
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                />
                
                <span className="text-[#1A2530]">|</span>
              </div>
            )
          })}
        </motion.div>

        {/* Gradient edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A1014] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A1014] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
