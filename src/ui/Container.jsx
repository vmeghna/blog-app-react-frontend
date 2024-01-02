import PropTypes from "prop-types";
function Container({ children, className }) {
  return <div className={`mx-auto max-w-5xl p-5 ${className}`}>{children}</div>;
}

Container.defaultProps = {
  className: "",
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
