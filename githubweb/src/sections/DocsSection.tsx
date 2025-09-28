import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const repoUrl = "https://github.com/RickZhou0527/ASimpleStarGazer";
const readmeUrl = `${repoUrl}#readme`;

export function DocsSection() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("https://api.github.com/repos/RickZhou0527/ASimpleStarGazer")
      .then(async (response) => {
        if (!response.ok) return null;
        const data = await response.json();
        return typeof data.stargazers_count === "number"
          ? data.stargazers_count
          : null;
      })
      .then((count) => {
        if (isMounted && count !== null) {
          setStars(count);
        }
      })
      .catch(() => {
        /* ignore network errors */
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="docs"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24"
      aria-labelledby="docs-heading"
    >
      <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_center,_rgba(110,74,255,0.18),_transparent_65%)]" />
      <div className="container flex flex-col items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-secondary">
            Documentation
          </span>
          <h2 id="docs-heading" className="text-3xl font-semibold md:text-4xl">
            Build with confidence, deploy with ease
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Explore architecture decisions, deployment blueprints, and integration guides
            inside the project documentation. Contributions welcome.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="primary" className="gap-2">
              <a href={readmeUrl} target="_blank" rel="noreferrer">
                <BookOpen className="h-5 w-5" aria-hidden />
                Read the GitHub Docs
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <Star className="h-5 w-5" aria-hidden />
                {stars !== null ? `${stars.toLocaleString()} GitHub stars` : "Check the repo"}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
