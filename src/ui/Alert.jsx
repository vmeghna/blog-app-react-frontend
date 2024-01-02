import PropTypes from "prop-types";

const getAlertStyle = (type) => {
  switch (type) {
    case "error":
      return "alert-warning";
    case "success":
      return "alert-success";

    default:
      return;
  }
};

const Alert = ({ type, message }) => {
  return (
    <div role="alert" className={`alert ${getAlertStyle(type)}`}>
      <i className="fas fa-exclamation-triangle"></i>
      <span>{message}.</span>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success"]),
};

export default Alert;
