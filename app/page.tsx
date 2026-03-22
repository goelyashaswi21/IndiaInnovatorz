import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { GovernanceSection } from "@/components/governance-section"
import { DataSection } from "@/components/data-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { IntelligenceSection } from "@/components/intelligence-section"
import { ScaleSection } from "@/components/scale-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { ResearchSection } from "@/components/research-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground">
      <CustomCursor />
      <SmoothScroll />
      <Navigation />
      
      {/* Sections */}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <GovernanceSection />
      <DataSection />
      <ArchitectureSection />
      <IntelligenceSection />
      <ScaleSection />
      <RoadmapSection />
      <ResearchSection />
      <Footer />
    </main>
  )
}
