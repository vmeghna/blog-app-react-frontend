import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../features/user/GoogleButton";
import useMoveToHome from "../hooks/useMoveToHome";
import Alert from "../ui/Alert";
import { errorMessages } from "../utils/helperFuntions";

const Register = () => {
  const { signup, loginWithGoogle } = useAuth();

  const moveToHome = useMoveToHome();

  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // New state for confirming password
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, name } = userCredentials;

    // Validate form fields
    if (!email || !password || !confirmPassword || !name) {
      setError(errorMessages.emptyFields);
      return;
    }

    if (password.length < 6) {
      setError(errorMessages.passwordLength);
      return;
    }

    if (password !== confirmPassword) {
      setError(errorMessages.passwordMismatch);
      return;
    }

    try {
      setLoading(true);
      await signup(userCredentials);
      moveToHome();
    } catch (error) {
      // Use the appropriate error message based on the error code
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(errorMessages.emailInUse);
          break;
        default:
          setError(errorMessages.registrationFailed);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle(userCredentials);
      moveToHome();
    } catch (error) {
      setError(errorMessages.googleAuthFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 w-full max-w-md space-y-3 rounded-lg border border-base-200 px-5 py-10 text-center text-primary shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-3xl font-bold text-primary">Register</h2>

        {error && <Alert type={"error"} message={error} />}

        {/* Name Input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            value={userCredentials.name}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* Email Address Input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">
              Email Address
            </span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered w-full"
            value={userCredentials.email}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* Password Input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password should be at least 6 characters long."
            className="input input-bordered w-full"
            value={userCredentials.password}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* Confirm Password Input */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">
              Confirm Password
            </span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="input input-bordered w-full"
            value={userCredentials.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Register
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>

      <div className="divider">OR</div>
      <GoogleButton handleGoogleLogin={handleGoogleLogin} disabled={loading} />

      <div className="mt-4 text-sm text-neutral">
        Already have an account?
        <Link to="/login" className="ml-1 text-primary hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
