import logo from "../../packages/assets/images/icon.png";

export function FooterSection() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-12" aria-labelledby="site-footer">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="ASimpleStarGazer logo"
            className="h-12 w-12 rounded-2xl border border-border/60 bg-background object-cover"
          />
          <div>
            <p id="site-footer" className="text-lg font-semibold">
              ASimpleStarGazer
            </p>
            <p className="text-sm text-muted-foreground">
              Turn the night sky into your story.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <a
            href="mailto:Rickzhou0527@hotmail.com"
            className="text-sm text-secondary transition hover:text-secondary/70"
          >
            Rickzhou0527@hotmail.com
          </a>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-6">
            <a href="#privacy" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-foreground">
              Terms
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ASimpleStarGazer. Crafted for the community.
          </p>
        </div>
      </div>
      <div className="sr-only">
        <p id="privacy">
          Privacy Policy placeholder — update with your project policy before launch.
        </p>
        <p id="terms">Terms of Service placeholder — update with your project terms.</p>
      </div>
    </footer>
  );
}
