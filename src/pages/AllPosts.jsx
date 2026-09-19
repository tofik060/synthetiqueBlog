import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { PostCardSkeleton } from "../components/PostCard";
import appwriteService from "../appwrite/conf";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((result) => {
        if (result) setPosts(result.documents);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-mesh min-h-full w-full py-10">
      <Container>
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-blue-600">Library</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            All posts
          </h1>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center text-slate-500">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
