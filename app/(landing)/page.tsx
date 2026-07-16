import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CampaignBanner } from "@/components/CampaignBanner";
import { ContentTabs } from "@/components/ContentTabs";
import Image from "next/image";
import { Shield, Clock, CreditCard, HeadphonesIcon } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "Every seller is vetted for quality and reliability.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Escrow-based payments protect both buyers and sellers.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "98% of projects are delivered on or before the deadline.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our team is here to help whenever you need it.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CampaignBanner />
      <ContentTabs />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Why choose ineed
          </h2>
          <p className="mt-3 text-foreground/50 text-sm max-w-md mx-auto">
            Everything you need to find the right professional and get your
            project done.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white border border-border p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-foreground p-10 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-white/60 text-sm max-w-md mx-auto">
            Join thousands of freelancers and businesses already using
            ineed to get work done.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#"
              className="rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-lg cursor-pointer"
            >
              Find a Freelancer
            </a>
            <a
              href="#"
              className="rounded-xl bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 cursor-pointer"
            >
              Start Selling
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-ineed.jpg"
                alt="ineed"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg object-cover"
              />
              <span className="text-sm font-extrabold text-foreground">
                ineed
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-medium text-foreground/40">
              <a href="#" className="hover:text-foreground/60 transition-colors cursor-pointer">
                Terms
              </a>
              <a href="#" className="hover:text-foreground/60 transition-colors cursor-pointer">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground/60 transition-colors cursor-pointer">
                Help
              </a>
              <span>© 2026 ineed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
