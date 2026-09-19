import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="bg-mesh min-h-full py-10">
      <Container>
        <div className="mb-6">
          <p className="mb-1 text-sm font-medium text-blue-600">Create</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            Add post
          </h1>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
