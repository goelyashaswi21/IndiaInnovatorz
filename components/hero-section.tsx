'use client'

import { motion } from 'framer-motion'
import { DelhiHeatmap } from './delhi-heatmap'
import { LiveTicker } from './live-ticker'
import { ArrowRight, ChevronDown } from 'lucide-react'

const headlineWords = ['Know', 'Your', "Ward's", 'Air.', 'Act', 'Before', 'It', 'Kills.']
const goldWords = ['Air.', 'Kills.']

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background effects - translucent to show Delhi image */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyan glow top-left */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Magenta glow bottom-right */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF00FF]/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Green accent */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#00FF88]/8 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Grid pattern - subtle */}
        <div className="absolute inset-0 hex-grid-bg opacity-20" />
      </div>

      {/* Main content */}
      <div className="flex-1 relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="text-[#00D4FF] text-sm font-display font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              PROJECT VAAYU
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8">
            {headlineWords.map((word, index) => (
              <motion.span
                key={word + index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-3 ${
                  goldWords.includes(word) ? 'text-gradient-gold' : 'text-white'
                }`}
              >
                {word}
                {(word === 'Air.' || word === 'Kills.') && <br className="hidden lg:block" />}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-[#B8C8D8] max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10"
          >
            India&apos;s first ward-level AI pollution intelligence system.
            <br />
            <span className="text-[#6A8090]">
              Real-time source attribution. Automated enforcement. 272 wards. 15 minutes.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gold px-8 py-4 rounded-xl font-display font-bold text-lg flex items-center justify-center gap-2 group"
              data-hoverable
            >
              Explore the Platform
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost px-8 py-4 rounded-xl font-display font-bold text-lg"
              data-hoverable
            >
              View Research
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full max-w-lg lg:max-w-xl"
        >
          <DelhiHeatmap />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6A8090] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[#00D4FF] drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
        </motion.div>
      </motion.div>

      {/* Ticker at bottom */}
      <div className="relative z-20 mt-auto">
        <LiveTicker />
      </div>
    </section>
  )
}
