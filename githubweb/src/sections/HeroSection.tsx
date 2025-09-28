import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

import heroBanner from "../../packages/assets/images/banner3.png";
import { Button } from "@/components/ui/button";

const HERO_PARALLAX_DISTANCE = 140;

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, HERO_PARALLAX_DISTANCE * -1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.6]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-background text-foreground"
      aria-labelledby="hero-heading"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ y, opacity }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(110,74,255,0.35),_transparent_60%)]"
        />
        <div
          className="absolute inset-0 bg-[length:140%_140%] bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </motion.div>

      <div className="container relative z-10 grid gap-10 py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:items-center">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-muted-foreground shadow-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            Open-source cosmic intelligence for every stargazer
          </span>
          <div className="space-y-4">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground drop-shadow md:text-6xl"
            >
              ASimpleStarGazer
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              Turn the night sky into your story. Plan sessions, surface insights, and
              explore an AI-powered observation companion crafted for developers,
              researchers, and dreamers.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="primary" className="gap-2">
              <a
                href="https://github.com/RickZhou0527/ASimpleStarGazer"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" aria-hidden />
                View Demo / Star on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a
                href="https://github.com/RickZhou0527/ASimpleStarGazer#documentation"
                target="_blank"
                rel="noreferrer"
              >
                Docs
                <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </Button>
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-6 text-sm text-muted-foreground md:grid-cols-4">
            <div>
              <p className="text-2xl font-semibold text-foreground">+120</p>
              <p>User sessions logged</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">7min</p>
              <p>Avg. planning time saved</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">24/7</p>
              <p>AI knowledge retrieval</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">OSS</p>
              <p>Made with cosmic love</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="relative hidden h-full min-h-[320px] items-center justify-center md:flex"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 rounded-[3rem] border border-secondary/30 bg-stars-gradient opacity-80 blur-3xl" />
          <div className="relative flex aspect-square max-w-sm flex-col justify-between rounded-[3rem] border border-border/40 bg-card/60 p-10 shadow-soft backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary/80">
                Mission Brief
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                Observe. Forecast. Connect.
              </h2>
            </div>
            <p className="text-muted-foreground">
              Blend AI retrieval, real-time conditions, and a passionate community to
              orchestrate unforgettable nights under the cosmos.
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Next window</span>
              <span className="flex items-center gap-1 text-accent">
                20:45 UTC <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
