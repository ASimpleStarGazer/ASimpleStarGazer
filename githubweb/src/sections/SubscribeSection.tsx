import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/yourFormId";

type FormState = "idle" | "loading" | "success" | "error";

export function SubscribeSection() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    if (!email || typeof email !== "string") return;

    setState("loading");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        setState("success");
      } else {
        throw new Error("Network error");
      }
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  return (
    <section
      id="subscribe"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24"
      aria-labelledby="subscribe-heading"
    >
      <div className="absolute inset-x-0 top-0 -z-[1] h-64 bg-[radial-gradient(circle_at_top,_rgba(255,214,107,0.18),_transparent_70%)]" />
      <div className="container">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[2.5rem] border border-border/40 bg-card/80 p-10 text-center shadow-soft backdrop-blur-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm uppercase tracking-[0.4em] text-secondary">Stay tuned</span>
          <div className="space-y-4">
            <h2 id="subscribe-heading" className="text-3xl font-semibold md:text-4xl">
              🌌 Want to get the latest updates and stargazing tips?
            </h2>
            <p className="text-base text-muted-foreground">
              Subscribe and never miss the stars.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4 sm:flex-row sm:items-center"
          >
            <label className="sr-only" htmlFor="subscribe-email">
              Email address
            </label>
            <Input
              id="subscribe-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="flex-1 bg-background/70"
            />
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="min-w-[160px]"
              disabled={state === "loading"}
            >
              {state === "loading" ? "Sending..." : "Subscribe"}
            </Button>
          </form>
          {state === "success" ? (
            <p className="text-sm text-accent">Thanks! Please confirm from your inbox.</p>
          ) : state === "error" ? (
            <p className="text-sm text-red-300">
              Something went wrong. Please try again later.
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
