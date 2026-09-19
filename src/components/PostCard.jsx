import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

function timeAgo(dateString) {
  if (!dateString) return "Just now";
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`} className="block h-full no-underline">
      <article className="card-lift fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm shadow-slate-200/60">
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No image
            </div>
          )}
        </div>

        <h2 className="font-display mb-3 line-clamp-2 px-1 text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <div className="mt-auto flex items-start gap-2 border-t border-slate-100 px-1 pt-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Created
            </p>
            <p className="text-sm font-medium text-slate-700">
              {timeAgo($createdAt)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-3">
      <div className="mb-3 aspect-[4/3] animate-pulse rounded-xl bg-slate-200/80" />
      <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-slate-200/80" />
      <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-slate-200/70" />
      <div className="mt-auto border-t border-slate-100 pt-3">
        <div className="h-8 w-1/2 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

export default PostCard;
