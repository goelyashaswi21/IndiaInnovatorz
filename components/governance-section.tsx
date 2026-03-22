'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GovernancePipeline } from './governance-pipeline'

const citations = [
  { title: 'Nature Scientific Reports 2024', doi: '10.1038/s41598-024' },
  { title: 'Lancet Planetary Health 2023', doi: '10.1016/S2542-5196' },
  { title: 'ESA Sentinel-5P Validation', doi: 'esa.int/sentinel-5p' },
  { title: 'IIT Kanpur PMF Study', doi: '10.1016/j.atmosenv' },
  { title: 'EGUsphere Copernicus 2025', doi: '10.5194/egusphere' },
]

export function GovernanceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="governance" className="relative py-32 overflow-hidden">
      {/* Background with purple glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,27,61,0.4)_0%,transparent_60%)]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#F5C9A0] text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block">
            THE UNIQUE DIFFERENTIATOR
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6">
            <span className="text-gradient-gold">Governance-as-Code</span>
          </h2>
          <p className="text-xl text-[#C8C8D8] max-w-2xl mx-auto">
            Every research paper stops at <span className="text-[#D94F4F]">Recommend</span>. 
            We close the loop.
          </p>
        </motion.div>

        {/* Comparison rows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 space-y-4"
        >
          {/* Traditional approach */}
          <div className="vaayu-card p-6 border-l-4 border-l-[#D94F4F]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#D94F4F]/20 text-[#D94F4F]">
                ALL 5 RESEARCH PAPERS
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <span className="text-white">Detect</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Model</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Recommend</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-[#D94F4F] font-bold animate-pulse">STOP</span>
            </div>
          </div>

          {/* Vaayu approach */}
          <div className="vaayu-card p-6 border-l-4 border-l-[#4CAF8C] animate-border-glow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#4CAF8C]/20 text-[#4CAF8C]">
                PROJECT VAAYU
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <span className="text-white">Detect</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Attribute</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Legislate</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Assign</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Track</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-white">Measure</span>
              <span className="text-[#7A7A9A]">→</span>
              <span className="text-[#7B68EE] font-bold">Retrain</span>
              <span className="text-[#7B68EE]">↩</span>
            </div>
          </div>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <GovernancePipeline />
        </motion.div>

        {/* Citations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#7A7A9A] text-sm mb-4">Validated by 5 peer-reviewed papers</p>
          <div className="flex flex-wrap justify-center gap-3">
            {citations.map((citation) => (
              <a
                key={citation.doi}
                href={`https://doi.org/${citation.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#1A1A2E] text-[#C8C8D8] border border-[rgba(196,131,58,0.12)] hover:border-[rgba(196,131,58,0.4)] hover:text-[#C4833A] transition-all"
                data-hoverable
              >
                {citation.title}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider max-w-7xl mx-auto mt-20" />
    </section>
  )
}
