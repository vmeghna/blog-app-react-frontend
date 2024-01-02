import PropTypes from "prop-types";

const GridTemplate = ({ children }) => {
  return (
    <div className="my-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
};

GridTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node, // Single node
    PropTypes.arrayOf(PropTypes.node), // Array of nodes
  ]).isRequired,
};

export default GridTemplate;
