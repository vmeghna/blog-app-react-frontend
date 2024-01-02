import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-neutral">
          404 - Page Not Found
        </h1>
        <p className="mb-8 text-lg text-base-300">
          Oops! The page you are looking for might be in another universe.
        </p>
        <Link to="/" className="btn btn-accent btn-lg">
          <i className="fa-solid fa-house"></i>
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
