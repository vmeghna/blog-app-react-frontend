import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useBlogs } from "../context/BlogsContext";
import Alert from "../ui/Alert";
import Container from "../ui/Container";
import { scrollToTop } from "../utils/helperFuntions";

const CreateBlog = () => {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const { createBlog } = useBlogs();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { currentUser } = useAuth();
  if (!currentUser) return null;
  const { uid, displayName } = currentUser;

  const onSubmit = async (data) => {
    const newBlog = { author: { id: uid, name: displayName }, ...data };
    try {
      setLoading(true);
      await createBlog(newBlog);
      setMessage({ type: "success", content: "Blog Created Successfully" });
      reset();
    } catch (error) {
      setMessage({ type: "error", content: error.message });
    } finally {
      setLoading(false);
      scrollToTop();
    }
  };

  const handleReset = () => {
    setMessage({});
    scrollToTop();
  };

  return (
    <Container>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-4xl font-semibold">Create Blog</h3>
        {message?.type && (
          <Alert type={message.type} message={message.content} />
        )}
        {/* Title  */}
        <label className="form-control">
          <div className="label">Title</div>
          <input
            type="text"
            placeholder="e.g. The Future of Artificial Intelligence"
            {...register("title", { required: "The title field is required" })}
            className={`input input-bordered ${
              errors?.title?.message ? "input-error" : ""
            }`}
          />

          {errors?.title?.message && (
            <div className="label text-error">{errors?.title?.message}</div>
          )}
        </label>

        {/* Subtitle */}
        <label className="form-control">
          <div className="label">Subtitle</div>
          <input
            type="text"
            placeholder="e.g. Exploring the possibilities and potential pitfalls of AI"
            {...register("subtitle", {})}
            className={`} input input-bordered`}
          />
        </label>

        {/* Content  */}
        <label className="form-control">
          <div className="label">Write your content</div>
          <textarea
            type="text"
            {...register("content", {
              required: "The content field is required",
            })}
            className={`textarea textarea-bordered h-24 ${
              errors?.content?.message ? "textarea-error" : ""
            }`}
          />

          {errors?.content?.message && (
            <div className="label text-error">{errors?.content?.message}</div>
          )}
        </label>

        {/* Select the tag */}
        <label className="form-control">
          <div className="label">Select Tag</div>
          <select
            {...register("tag", { required: "The tag is required" })}
            className={`select select-bordered ${
              errors?.content?.message ? "select-error" : ""
            }`}
          >
            <option value="">Pick any one tag.</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Improvement">Improvement</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Environment">Environment</option>
          </select>
          {errors?.tag?.message && (
            <div className="label text-error">{errors?.tag?.message}</div>
          )}
        </label>

        {/* ImageUrl  */}
        <label className="form-control">
          <div className="label">ImageUrl</div>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            {...register("imageUrl", {
              required: "The imageUrl field is required",
              pattern: /https:/,
            })}
            className={`input input-bordered ${
              errors?.imageUrl?.message ? "input-error" : ""
            }`}
          />

          {errors?.imageUrl?.message && (
            <div className="label text-error">{errors?.imageUrl?.message}</div>
          )}
        </label>

        <button
          className="mr-2 btn btn-primary"
          type="submit"
          disabled={loading}
        >
          Publish
        </button>
        <button className="btn btn-neutral" type="reset" onClick={handleReset}>
          Clear
        </button>
      </form>
    </Container>
  );
};

export default CreateBlog;
