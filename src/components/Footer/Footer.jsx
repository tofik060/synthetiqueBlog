import { Link } from "react-router-dom";
import Logo from "../Logo";

function MiniChart({ variant }) {
  if (variant === "line") {
    return (
      <svg viewBox="0 0 120 40" className="mb-3 h-10 w-28" aria-hidden>
        <path
          d="M2 30 C20 28, 28 10, 45 14 S70 34, 90 12 S110 8, 118 16"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="90" cy="12" r="3" fill="#93c5fd" />
      </svg>
    );
  }

  if (variant === "donut") {
    return (
      <svg viewBox="0 0 48 48" className="mb-3 h-10 w-10" aria-hidden>
        <circle cx="24" cy="24" r="16" fill="none" stroke="#334155" strokeWidth="8" />
        <circle
          cx="24"
          cy="24"
          r="16"
          fill="none"
          stroke="#34d399"
          strokeWidth="8"
          strokeDasharray="60 40"
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
        />
        <circle
          cx="24"
          cy="24"
          r="16"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="8"
          strokeDasharray="20 80"
          strokeDashoffset="-60"
          transform="rotate(-90 24 24)"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 40" className="mb-3 h-10 w-20" aria-hidden>
      <rect x="4" y="18" width="10" height="18" rx="2" fill="#a78bfa" />
      <rect x="22" y="8" width="10" height="28" rx="2" fill="#818cf8" />
      <rect x="40" y="14" width="10" height="22" rx="2" fill="#c084fc" />
      <rect x="58" y="4" width="10" height="32" rx="2" fill="#e879f9" />
    </svg>
  );
}

const columns = [
  {
    title: "Company",
    chart: "line",
    chartLabel: "Team Growth",
    links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
  },
  {
    title: "Support",
    chart: "donut",
    chartLabel: "Average Response Time",
    links: ["Account", "Help", "Contact Us", "Customer Support"],
  },
  {
    title: "Legals",
    chart: "bars",
    chartLabel: "Compliance Updates",
    links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-800 text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-10 bottom-0 h-48 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute right-8 top-8 text-4xl text-white/20">✦</div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo asLink={false} light stacked />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by
              Synthetique.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <MiniChart variant={col.chart} />
              <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                {col.chartLabel}
              </p>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((label) => (
                  <li key={label}>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 no-underline transition hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
