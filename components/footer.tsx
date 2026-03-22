"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowUpRight, Send } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Features", href: "#solution" },
    { label: "Technology", href: "#architecture" },
    { label: "Data Sources", href: "#data" },
    { label: "API Access", href: "#" }
  ],
  research: [
    { label: "Publications", href: "#research" },
    { label: "Methodology", href: "#" },
    { label: "Open Data", href: "#" },
    { label: "Collaboration", href: "#" }
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Team", href: "#research" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" }
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Data Policy", href: "#" },
    { label: "Accessibility", href: "#" }
  ]
}

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" }
]

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <footer ref={ref} className="relative bg-foreground text-background overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`footer-particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${(i * 3.33) % 100}%`,
              top: `${(i * 7.77) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: (i % 3) + 2,
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="relative border-b border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <h2 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
                Ready to
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Transform
                </span>
                Air Quality?
              </h2>
              <p className="text-lg text-background/70">
                Join the movement for cleaner air. Get early access to our platform and be part of the solution.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-background/20 bg-background/5 p-2 backdrop-blur-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent px-6 py-4 text-lg text-background placeholder:text-background/50 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitted ? (
                    "Subscribed!"
                  ) : isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span className="hidden sm:inline">Get Early Access</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </div>
              
              {/* Decorative glow */}
              <motion.div
                className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 blur-2xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                className="relative flex h-12 w-12 items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent" />
                <span className="relative text-2xl font-black text-foreground">V</span>
              </motion.div>
              <span className="text-2xl font-black tracking-tight">VAAYU</span>
            </div>
            <p className="mb-6 text-background/70">
              AI-powered environmental intelligence for a cleaner, healthier India. 
              Making air quality data accessible and actionable.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 text-primary" />
                <span>IIT Delhi Research Park, New Delhi</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@projectvaayu.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 11 2659 1234</span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/5 transition-colors hover:border-primary hover:bg-primary/10"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + catIndex * 0.1 }}
            >
              <h4 className="mb-4 font-bold uppercase tracking-wider text-background/50">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="group flex items-center gap-1 text-background/70 transition-colors hover:text-primary"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <motion.p
              className="text-sm text-background/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              2025 Project Vaayu. Built for India, by India.
            </motion.p>
            
            <motion.div
              className="flex items-center gap-6 text-sm text-background/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                All systems operational
              </span>
              <span>v1.0.0</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
