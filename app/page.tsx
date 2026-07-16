import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CampaignBanner } from "@/components/CampaignBanner";
import { ContentTabs } from "@/components/ContentTabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <CampaignBanner />
      <ContentTabs />

      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-xs font-bold text-white">F</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                FreelanceHub
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Help
              </a>
              <span>© 2026 FreelanceHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
