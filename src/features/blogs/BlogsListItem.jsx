import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "../../ui/Avatar";
import { formatPostingTime } from "../../utils/helperFuntions";

const BlogsListItem = ({ item }) => {
  const {
    id,
    author: { name },
    title,
    subtitle,
    tag,
    imageUrl,
    createdAt,
  } = item;

  return (
    <article className="overflow-hidden transition-all duration-300 shadow-md rounded-xl bg-base-100 hover:drop-shadow-lg">
      <Link to={`/blogs/${id}`}>
      
        <div className="flex flex-col md:flex-row">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-56 md:order-2 md:h-auto md:w-1/4"
          />
          <div className="flex flex-grow flex-col gap-4 p-5 md:min-h-[300px]">
            <div className="space-y-2">
              <span className="badge badge-secondary badge-outline badge-lg">
                {tag}
              </span>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <h3 className="text-lg">{subtitle}</h3>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={name} />
                <span className="font-medium">{name}</span>
              </div>
              <div className="text-sm">{formatPostingTime(createdAt.toDate())}</div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

BlogsListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    tag: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired, // Assuming createdAt is a string representing the timestamp
  }).isRequired,
};

export default BlogsListItem;
