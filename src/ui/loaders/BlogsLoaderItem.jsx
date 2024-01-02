const BlogsLoaderItem = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-grow space-y-4">
        <div className="skeleton h-4"></div>
        <div className="skeleton h-4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-12 w-12 rounded-full"></div>
      </div>
      <div className="skeleton h-auto w-1/4"></div>
    </div>
  );
};

export default BlogsLoaderItem;
