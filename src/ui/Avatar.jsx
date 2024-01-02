import PropTypes from "prop-types";
const Avatar = ({ name }) => {
  const avatarTitle = name
    ?.split(" ")
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="avatar placeholder">
      <div className="w-12 rounded-full bg-primary text-primary-content">
        <span>{avatarTitle}</span>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
