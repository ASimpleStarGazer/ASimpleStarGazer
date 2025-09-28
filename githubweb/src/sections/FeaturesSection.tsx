import { motion, type Variants } from "framer-motion";
import {
  Bot,
  Cloud,
  Languages,
  Telescope,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "AI Powered",
    description:
      "RAG pipelines with FAISS/ChromaDB keep your offline knowledge instantly accessible, even without the cloud.",
    icon: Bot,
  },
  {
    title: "Cross-platform",
    description:
      "Run locally via Docker or desktop builds, and scale to AWS, GCP, or Azure when you need more sky.",
    icon: Cloud,
  },
  {
    title: "Multi-language",
    description:
      "Automatic English/Chinese experience detection keeps teams aligned across regions.",
    icon: Languages,
  },
  {
    title: "Stargazing Toolkit",
    description:
      "Weather, moon phase, live star maps, and light pollution index bundled into a friendly mission console.",
    icon: Telescope,
  },
  {
    title: "Social Community",
    description:
      "Capture and share Xiaohongshu-style stories, photos, and clips with the stargazer collective.",
    icon: Users,
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative border-t border-border/40 bg-background/95 py-24 backdrop-blur"
      aria-labelledby="features-heading"
    >
      <div className="container relative">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-secondary">
            Capabilities
          </span>
          <h2 id="features-heading" className="mt-6 text-3xl font-semibold md:text-4xl">
            Chart every sky with confidence
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From observation prep to community storytelling, ASimpleStarGazer delivers an
            end-to-end workflow in a single, open-source surface.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Card className="group h-full">
                  <CardHeader className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
