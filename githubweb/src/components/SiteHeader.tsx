import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Team", href: "#team" },
  { label: "Docs", href: "#docs" },
  { label: "Subscribe", href: "#subscribe" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container flex items-center justify-between gap-6 py-6">
        <a
          href="#hero"
          className="text-lg font-semibold text-foreground transition hover:text-secondary"
        >
          ASimpleStarGazer
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary/70"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Button asChild size="sm" variant="primary" className="gap-2">
            <a
              href="https://github.com/RickZhou0527/ASimpleStarGazer"
              target="_blank"
              rel="noreferrer"
            >
              Star Project
            </a>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground shadow-soft transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden">
          <div className="container flex flex-col gap-4 py-6 text-sm">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-transparent px-4 py-3 text-muted-foreground transition hover:border-secondary/50 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button asChild size="sm" variant="primary" className="mt-2">
              <a
                href="https://github.com/RickZhou0527/ASimpleStarGazer"
                target="_blank"
                rel="noreferrer"
              >
                Star Project
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
