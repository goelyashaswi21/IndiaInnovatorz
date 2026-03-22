import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Project Vaayu | India\'s First Ward-Level AI Pollution Intelligence',
  description: 'Real-time source attribution. Automated enforcement. 272 wards. 15 minutes. Know Your Ward\'s Air. Act Before It Kills.',
  keywords: ['air quality', 'pollution', 'AI', 'Delhi', 'environmental', 'IoT', 'machine learning'],
  authors: [{ name: 'Project Vaayu' }],
  openGraph: {
    title: 'Project Vaayu | AI Pollution Intelligence',
    description: 'India\'s first ward-level AI pollution intelligence and automated enforcement platform.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D0D14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#0A1014] text-white">
        {/* Fixed Delhi background image */}
        <div className="bg-delhi-fixed" aria-hidden="true" />
        {/* Dark overlay for readability */}
        <div className="bg-overlay" aria-hidden="true" />
        {/* Grain texture */}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
