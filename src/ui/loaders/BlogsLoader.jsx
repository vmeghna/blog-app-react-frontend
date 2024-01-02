import GridTemplate from "../GridTemplate";
import BlogsLoaderItem from "./BlogsLoaderItem";

const BlogsLoader = () => {
  return (
    <GridTemplate>
      {Array.from({ length: 8 }).map((_, index) => (
        <BlogsLoaderItem key={index} />
      ))}
    </GridTemplate>
  );
};

export default BlogsLoader;
