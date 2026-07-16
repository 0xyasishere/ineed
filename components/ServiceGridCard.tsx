import type { Service } from "@/types/service";

const categoryGradients: Record<string, string> = {
  "UI/UX Design": "from-pink-400 to-rose-500",
  "Web Development": "from-blue-400 to-indigo-500",
  Branding: "from-amber-400 to-orange-500",
  Copywriting: "from-emerald-400 to-teal-500",
  "Mobile Apps": "from-violet-400 to-purple-500",
  Marketing: "from-cyan-400 to-sky-500",
};

export function ServiceGridCard({ service }: { service: Service }) {
  const gradient =
    categoryGradients[service.category] || "from-gray-400 to-gray-500";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200">
      <div
        className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} p-6 flex flex-col justify-end`}
      >
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
          {service.category}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
          ★ {service.freelancer.rating}
        </span>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        <div className="relative z-10 text-[11px] font-medium text-white/70">
          {service.deliveryDays} day delivery
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {service.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                {service.freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="text-xs font-medium text-gray-600">
                {service.freelancer.name}
              </span>
            </div>
            <span className="text-base font-bold text-gray-900">
              {service.currency}
              {service.price}
            </span>
          </div>
        </div>

        <button className="mt-4 w-full rounded-xl bg-gray-50 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-900 hover:text-white">
          View Details
        </button>
      </div>
    </article>
  );
}
