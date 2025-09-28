import { SiteHeader } from "@/components/SiteHeader";
import { DocsSection } from "@/sections/DocsSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { FooterSection } from "@/sections/FooterSection";
import { HeroSection } from "@/sections/HeroSection";
import { SubscribeSection } from "@/sections/SubscribeSection";
import { TeamSection } from "@/sections/TeamSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-inter text-foreground">
      <div className="relative">
        <SiteHeader />
        <main className="flex flex-col">
          <HeroSection />
          <FeaturesSection />
          <TeamSection />
          <DocsSection />
          <SubscribeSection />
        </main>
        <FooterSection />
      </div>
    </div>
  );
}
