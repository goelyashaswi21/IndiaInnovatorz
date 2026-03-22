"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { FileText, ExternalLink, Download, BookOpen, Users, Award } from "lucide-react"

const publications = [
  {
    title: "Real-time Air Quality Prediction Using Graph Neural Networks",
    authors: "Kumar et al.",
    venue: "NeurIPS 2024",
    type: "Conference",
    abstract: "Novel approach to spatiotemporal air quality forecasting using attention-based GNNs...",
    citations: 47,
    link: "#"
  },
  {
    title: "Low-cost Sensor Networks for Urban Air Quality Monitoring",
    authors: "Sharma, Patel, Gupta",
    venue: "Environmental Science & Technology",
    type: "Journal",
    abstract: "Comprehensive study on deploying affordable sensor networks in developing cities...",
    citations: 89,
    link: "#"
  },
  {
    title: "Policy-Aware Machine Learning for Environmental Governance",
    authors: "Singh et al.",
    venue: "ICML 2024",
    type: "Conference",
    abstract: "Framework for integrating policy constraints into ML models for actionable insights...",
    citations: 32,
    link: "#"
  }
]

const team = [
  { name: "Dr. Arun Kumar", role: "Lead Researcher", institution: "IIT Delhi" },
  { name: "Prof. Meera Sharma", role: "Environmental Science", institution: "JNU" },
  { name: "Dr. Raj Patel", role: "ML Engineering", institution: "IIIT Hyderabad" },
  { name: "Dr. Priya Singh", role: "Policy Research", institution: "TERI" }
]

export function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedPub, setSelectedPub] = useState<number | null>(null)
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null)

  return (
    <section ref={ref} id="research" className="relative min-h-screen bg-card py-32 overflow-hidden">
      {/* Abstract pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`research-circle-${i}`}
            className="absolute rounded-full border border-primary"
            style={{
              width: ((i * 17) % 300) + 100,
              height: ((i * 17) % 300) + 100,
              left: `${(i * 5) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: (i % 5) + 5,
              repeat: Infinity,
              delay: (i % 4) * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-sm text-accent">
            RESEARCH
          </span>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-foreground md:text-7xl">
            Peer-Reviewed
            <span className="block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Science
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our work is grounded in rigorous academic research, published in top-tier venues
          </p>
        </motion.div>

        {/* Publications */}
        <div className="mb-24 grid gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${
                  selectedPub === index 
                    ? 'border-accent bg-accent/10' 
                    : 'border-muted bg-background/50 hover:border-accent/50'
                }`}
                onClick={() => setSelectedPub(selectedPub === index ? null : index)}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 font-mono text-xs ${
                        pub.type === 'Conference' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary/20 text-secondary'
                      }`}>
                        {pub.type}
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">{pub.venue}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-muted-foreground">{pub.authors}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{pub.citations}</div>
                      <div className="text-xs text-muted-foreground">Citations</div>
                    </div>
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
                      whileHover={{ scale: 1.1, rotate: 15 }}
                    >
                      <FileText className="h-5 w-5 text-accent" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {selectedPub === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 border-t border-muted pt-6">
                        <p className="mb-4 text-muted-foreground">{pub.abstract}</p>
                        <div className="flex gap-4">
                          <motion.button
                            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-medium text-accent-foreground"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Read Paper
                          </motion.button>
                          <motion.button
                            className="flex items-center gap-2 rounded-full border border-accent px-4 py-2 font-medium text-accent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24 grid gap-6 md:grid-cols-3"
        >
          {[
            { icon: BookOpen, value: "12+", label: "Publications" },
            { icon: Users, value: "500+", label: "Citations" },
            { icon: Award, value: "3", label: "Best Paper Awards" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-muted bg-background/50 p-8 text-center"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-8 w-8 text-accent" />
              </motion.div>
              <div className="text-4xl font-black text-foreground">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="mb-8 text-center text-3xl font-bold text-foreground">Research Team</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-muted bg-background/50 p-6 text-center"
                onHoverStart={() => setHoveredTeam(index)}
                onHoverEnd={() => setHoveredTeam(null)}
                whileHover={{ y: -10 }}
              >
                {/* Avatar placeholder */}
                <motion.div
                  className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-accent to-primary"
                  animate={hoveredTeam === index ? { scale: 1.1 } : { scale: 1 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </motion.div>
                <h4 className="mb-1 font-bold text-foreground">{member.name}</h4>
                <p className="mb-1 text-sm text-accent">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.institution}</p>

                {/* Decorative rings */}
                <AnimatePresence>
                  {hoveredTeam === index && (
                    <>
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30"
                          initial={{ width: 80, height: 80, opacity: 0 }}
                          animate={{ 
                            width: 80 + ring * 40, 
                            height: 80 + ring * 40, 
                            opacity: 0.3 - ring * 0.08 
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: ring * 0.1 }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
