import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserNavItems from "../features/user/UserNavItems";
import Logo from "./Logo";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar bg-base-300 px-5">
      <div className="flex-1">
        <Logo />
      </div>

      {currentUser ? (
        <UserNavItems />
      ) : (
        <div className="navbar-end space-x-3">
          <Link to="/login" className="btn btn-neutral">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
