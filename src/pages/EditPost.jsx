import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="bg-mesh min-h-full py-10">
      <Container>
        <div className="mb-6">
          <p className="mb-1 text-sm font-medium text-blue-600">Edit</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            Update post
          </h1>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="bg-mesh grid min-h-[50vh] place-items-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
    </div>
  );
}

export default EditPost;
