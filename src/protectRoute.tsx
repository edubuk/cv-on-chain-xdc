// import packages
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const userMailId = sessionStorage.getItem("userMailId");

  useEffect(() => {
    if (!userMailId) {
      return navigate("/", { replace: true });
    }
  }, [userMailId, navigate]);

  return (
      <Outlet />
  );
};

export default ProtectedRoute;