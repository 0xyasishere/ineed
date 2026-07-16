import type { Job } from "@/types/service";

const categoryGradients: Record<string, string> = {
  "Web Development": "from-blue-400 to-indigo-500",
  "UI/UX Design": "from-pink-400 to-rose-500",
  "Content Writing": "from-emerald-400 to-teal-500",
  "Data Engineering": "from-violet-400 to-purple-500",
  Branding: "from-amber-400 to-orange-500",
  DevOps: "from-cyan-400 to-sky-500",
};

export function JobGridCard({ job }: { job: Job }) {
  const gradient =
    categoryGradients[job.category] || "from-gray-400 to-gray-500";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200">
      <div
        className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} p-6 flex flex-col justify-end`}
      >
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
          {job.category}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-green-500/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
          Open
        </span>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        <div className="relative z-10 flex items-center gap-2 text-[11px] font-medium text-white/70">
          <span>{job.postedAt}</span>
          <span>·</span>
          <span>{job.applicants} applicants</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {job.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {job.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {job.postedBy}
            </span>
            <span className="text-base font-bold text-gray-900">
              {job.currency}
              {job.budget.toLocaleString()}
            </span>
          </div>
        </div>

        <button className="mt-4 w-full rounded-xl bg-gray-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-600">
          Apply Now
        </button>
      </div>
    </article>
  );
}
