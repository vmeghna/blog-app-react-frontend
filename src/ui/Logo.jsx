import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center">
      <img
        src={"/company-logo.png"}
        alt="Company Logo"
        className="mr-2 h-12 w-12 rounded-full fill-slate-50"
      />
      <span className="font-abril text-2xl font-semibold tracking-wider">
        Meg's Blog
      </span>
    </Link>
  );
};

export default Logo;
