import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.postDelete(post.$id).then((data) => {
      if (data) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="bg-mesh min-h-full py-10">
      <Container>
        <article className="fade-up mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="relative">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="max-h-[420px] w-full object-cover"
            />
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-emerald-500" className="shadow-sm">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-rose-500" className="shadow-sm" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="px-6 py-8 sm:px-10">
            <h1 className="font-display mb-6 text-3xl font-semibold tracking-tight text-slate-900">
              {post.title}
            </h1>
            <div className="browser-css prose prose-slate max-w-none text-slate-700">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </div>
  ) : (
    <div className="bg-mesh grid min-h-[50vh] place-items-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
    </div>
  );
}

export default Post;
