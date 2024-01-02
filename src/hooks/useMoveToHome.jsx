import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/helperFuntions";

const useMoveToHome = () => {
  const navigate = useNavigate();

  return () => {
    scrollToTop();
    // Set Timeout to display message to user first
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
};

export default useMoveToHome;
