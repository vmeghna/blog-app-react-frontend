import PropTypes from "prop-types";

const GoogleButton = ({ handleGoogleLogin, disabled }) => {
  return (
    <div className="mt-4 text-center">
      <button
        className="btn btn-block"
        onClick={handleGoogleLogin}
        disabled={disabled}
      >
        <i className="fa-brands fa-google mr-2 text-xl"></i>
        Sign in with Google
      </button>
    </div>
  );
};

GoogleButton.propTypes = {
  handleGoogleLogin: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GoogleButton;
