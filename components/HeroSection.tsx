import { Search } from "lucide-react";

const popularSearches = ["Web Design", "React Dev", "UI/UX", "Copywriting"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-bold text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Trusted by 10,000+ freelancers
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Work with the
            <br />
            best freelancers
            <span className="text-primary"> worldwide</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/60 max-w-lg">
            Discover talented professionals, post projects, and get work done
            — all in one place.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl bg-white border-2 border-border p-2 pl-5 shadow-lg shadow-primary/5 transition-all duration-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-primary/10">
            <Search size={20} className="shrink-0 text-foreground/40" />
            <input
              type="text"
              placeholder="Search services, skills, or jobs..."
              className="flex-1 bg-transparent py-3.5 text-sm font-medium text-foreground placeholder-foreground/40 outline-none"
            />
            <button className="shrink-0 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 cursor-pointer">
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground/40 font-medium">
            <span>Popular:</span>
            {popularSearches.map((tag) => (
              <a
                key={tag}
                href="#"
                className="rounded-full bg-muted px-3.5 py-1.5 text-foreground/60 transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
