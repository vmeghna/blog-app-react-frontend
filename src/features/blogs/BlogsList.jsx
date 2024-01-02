import { useBlogs } from "../../context/BlogsContext";
import GridTemplate from "../../ui/GridTemplate";
import BlogsLoader from "../../ui/loaders/BlogsLoader";
import BlogsListItem from "./BlogsListItem";

const BlogsList = () => {
  const { loading, blogs } = useBlogs();

  if (loading) return <BlogsLoader />;

  return (
    <GridTemplate>
      {blogs?.map((item) => (
        <BlogsListItem item={item} key={item.id} />
      ))}
    </GridTemplate>
  );
};

export default BlogsList;
