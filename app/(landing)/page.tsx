"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CampaignBanner } from "@/components/CampaignBanner";
import { ContentTabs } from "@/components/ContentTabs";
import { UMKMCorner } from "@/components/UMKMCorner";
import { TrustSection } from "@/components/TrustSection";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CampaignBanner />
      <ContentTabs />
      <UMKMCorner />
      <TrustSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
