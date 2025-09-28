import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Rick",
    role: "Lead Developer",
    link: "https://github.com/RickZhou0527",
    avatar: "",
  },
  {
    name: "Paco",
    role: "Full-stack Developer",
    link: "https://github.com/pacodev",
    avatar: "",
  },
  {
    name: "Victor",
    role: "Product Manager",
    link: "https://www.linkedin.com/in/victor",
    avatar: "",
  },
  {
    name: "Jack",
    role: "Business Analyst",
    link: "https://www.linkedin.com/in/jack",
    avatar: "",
  },
  {
    name: "Irene",
    role: "AI Developer",
    link: "https://github.com/irene-ai",
    avatar: "",
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative border-t border-border/40 bg-background py-24"
      aria-labelledby="team-heading"
    >
      <div className="container">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-secondary">
            Crew
          </span>
          <h2 id="team-heading" className="mt-6 text-3xl font-semibold md:text-4xl">
            Meet the cosmic builders
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            An interdisciplinary squad turning astronomical workflows into delightful
            product experiences.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card className="group h-full border-border/40 bg-card/70">
                <CardHeader className="flex items-center gap-4">
                  <Avatar>
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={`${member.name} avatar`} />
                    ) : (
                      <AvatarFallback aria-hidden>
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-secondary transition hover:text-secondary/70"
                  >
                    Connect
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
