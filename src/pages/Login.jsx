import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../features/user/GoogleButton";
import useMoveToHome from "../hooks/useMoveToHome";
import Alert from "../ui/Alert";
import { errorMessages } from "../utils/helperFuntions";

const Login = () => {
  const { loginWithEmailAndPwd, loginWithGoogle } = useAuth();
  const moveToHome = useMoveToHome();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
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

    const { email, password } = userCredentials;
    // Validate form fields
    if (!email || !password) {
      setError(errorMessages.emptyFields);
      return;
    }

    try {
      setLoading(true);
      await loginWithEmailAndPwd(email, password);
      moveToHome();
    } catch (error) {
      // Use the appropriate error message based on the error code
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
          setError(errorMessages.userNotFound);
          break;
        case "auth/wrong-password":
          setError(errorMessages.wrongPassword);
          break;
        default:
          setError(errorMessages.loginFailed);
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
    <div className="mx-auto my-10 w-full max-w-md space-y-3 rounded-lg border border-base-200 px-5 py-10 text-center shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3 ">
        <h2 className="text-3xl font-bold text-primary">Login</h2>
        {/* Email Address Input */}

        {error && <Alert type={"error"} message={error} />}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg font-semibold">
              Email Address
            </span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="e.g. jififo2506@apdiv.com"
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
            placeholder="e.g. 123456"
            className="input input-bordered w-full"
            value={userCredentials.password}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>

      <div className="divider">Or</div>

      <GoogleButton handleGoogleLogin={handleGoogleLogin} disabled={loading} />

      <div className="mt-4 text-sm text-neutral">
        Don&apos;t have an account?
        <Link to="/register" className="ml-1 text-primary hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
