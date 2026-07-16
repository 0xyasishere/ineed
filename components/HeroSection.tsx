export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-4">
            Marketplace
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Work with the best
            <br />
            freelancers
            <span className="text-gray-300"> worldwide</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-500 max-w-lg">
            Discover talented professionals, post projects, and get work done
            — all in one place.
          </p>
        </div>

        <div className="mt-10 max-w-xl">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-1.5 pl-5">
            <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search services, skills, or jobs..."
              className="flex-1 bg-transparent py-3 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            <button className="shrink-0 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
              Search
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span>Popular:</span>
            {["Web Design", "React Dev", "UI/UX", "Copywriting"].map((tag) => (
              <a
                key={tag}
                href="#"
                className="rounded-full bg-gray-50 px-3 py-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
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
