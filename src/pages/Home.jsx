import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";
import { PostCardSkeleton } from "../components/PostCard";

function MetricsCard() {
  return (
    <aside className="fade-up hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/60 xl:block">
      <h3 className="font-display mb-1 text-base font-semibold text-slate-900">
        Interaction Metrics
      </h3>
      <p className="mb-4 text-xs text-slate-500">Engagement snapshot</p>
      <svg viewBox="0 0 200 200" className="mx-auto h-44 w-44" aria-hidden>
        <polygon
          points="100,20 170,70 145,155 55,155 30,70"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <polygon
          points="100,40 150,75 130,140 70,140 50,75"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <polygon
          points="100,60 130,80 120,125 80,125 70,80"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <polygon
          points="100,35 155,78 132,142 68,138 48,82"
          fill="url(#metricFill)"
          fillOpacity="0.35"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <circle cx="100" cy="35" r="4" fill="#3b82f6" />
        <circle cx="155" cy="78" r="4" fill="#22c55e" />
        <circle cx="132" cy="142" r="4" fill="#f59e0b" />
        <circle cx="68" cy="138" r="4" fill="#ec4899" />
        <circle cx="48" cy="82" r="4" fill="#8b5cf6" />
        <defs>
          <linearGradient id="metricFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
      </svg>
    </aside>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    appwriteService
      .getPosts()
      .then((result) => {
        if (result) setPosts(result.documents);
      })
      .finally(() => setLoading(false));
  }, [authStatus]);

  const placeholders = Math.max(0, 7 - posts.length);

  if (!authStatus) {
    return (
      <div className="bg-mesh min-h-full w-full py-10">
        <Container>
          <div className="fade-up rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <h2 className="font-display mb-2 text-2xl font-semibold text-slate-900">
              Login to read posts
            </h2>
            <p className="mb-6 text-slate-500">
              Sign in to browse active posts from the community.
            </p>
            <Link
              to="/login"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white no-underline"
            >
              Login
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-full w-full py-10">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-600">Your feed</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
              Latest posts
            </h1>
          </div>
          <Link
            to="/add-post"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-slate-800"
          >
            Write a post
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="fade-up rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <h2 className="font-display mb-2 text-2xl font-semibold text-slate-900">
              No posts yet
            </h2>
            <p className="mb-6 text-slate-500">
              Create your first post and it will show up here.
            </p>
            <Link
              to="/add-post"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white no-underline"
            >
              Add Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[1fr_220px]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
              {Array.from({ length: placeholders }).map((_, i) => (
                <PostCardSkeleton key={`ph-${i}`} />
              ))}
            </div>
            <MetricsCard />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
