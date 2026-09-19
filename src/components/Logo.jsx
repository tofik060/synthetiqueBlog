import { useId } from "react";
import { Link } from "react-router-dom";

function LogoMark({ className = "", light = false }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `sb-grad-${uid}`;
  const stroke = `url(#${gradId})`;

  return (
    <svg
      className={className}
      viewBox="0 0 72 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="20"
          y1="2"
          x2="52"
          y2="94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={light ? "#5EEAD4" : "#2EC4B6"} />
          <stop offset="0.5" stopColor={light ? "#38BDF8" : "#2186C4"} />
          <stop offset="1" stopColor={light ? "#93C5FD" : "#1B3A6B"} />
        </linearGradient>
      </defs>

      {/* Outer S / shield silhouette suggestion via circuit + book */}
      <path
        d="M34 6
           C22 8 14 18 16 30
           C18 42 28 46 34 52
           C42 60 48 68 46 80
           C44 90 32 94 22 90"
        stroke={stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner parallel traces (circuit) */}
      <path
        d="M26 14 C18 18 16 26 18 34 C20 42 28 46 32 48"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M40 16 C30 22 26 30 28 38 C30 46 36 52 42 56"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 40 C26 48 34 54 40 62 C44 68 46 76 44 84"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M30 58 C34 64 38 72 36 82"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Circuit nodes */}
      <circle cx="34" cy="6" r="2.6" fill={stroke} />
      <circle cx="26" cy="14" r="1.8" fill={stroke} />
      <circle cx="40" cy="16" r="1.8" fill={stroke} />
      <circle cx="16" cy="30" r="2.2" fill={stroke} />
      <circle cx="20" cy="40" r="1.7" fill={stroke} />
      <circle cx="34" cy="52" r="2.4" fill={stroke} />
      <circle cx="42" cy="56" r="1.7" fill={stroke} />
      <circle cx="44" cy="84" r="1.8" fill={stroke} />
      <circle cx="22" cy="90" r="2.6" fill={stroke} />

      {/* Open book pages */}
      <path
        d="M40 24 L58 16 L58 54 L40 62 Z"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 32 L54 26 L54 58 L40 64"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 34 L51 31 M45 42 L51 39 M45 50 L51 47"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Logo({
  width = "auto",
  className = "",
  light = false,
  asLink = true,
  stacked = false,
}) {
  const textMain = light ? "text-white" : "text-slate-900";
  const textSub = light ? "text-slate-300" : "text-slate-500";

  const mark = stacked ? (
    <span
      className={`inline-flex flex-col items-center gap-2.5 ${className}`}
      style={{ width }}
    >
      <LogoMark className="h-16 w-12" light={light} />
      <span className="flex flex-col items-center gap-1">
        <span
          className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${textMain}`}
        >
          Synthetique
        </span>
        <span
          className={`flex items-center gap-2.5 text-[0.65rem] font-medium uppercase tracking-[0.38em] ${textSub}`}
        >
          <span aria-hidden className="inline-block h-px w-4 bg-current opacity-45" />
          Blog
          <span aria-hidden className="inline-block h-px w-4 bg-current opacity-45" />
        </span>
      </span>
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={{ width }}
    >
      <LogoMark className="h-10 w-[30px] shrink-0" light={light} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.05rem] font-semibold tracking-tight ${textMain}`}
        >
          Synthetique
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-medium uppercase tracking-[0.28em] ${textSub}`}
        >
          Blog
        </span>
      </span>
    </span>
  );

  if (!asLink) return mark;
  return (
    <Link
      to="/"
      className="inline-flex items-center no-underline"
      aria-label="Synthetique Blog home"
    >
      {mark}
    </Link>
  );
}

export default Logo;
