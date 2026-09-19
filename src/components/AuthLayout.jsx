import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const isAuthorized = authStatus === authentication;

  useEffect(() => {
    if (!isAuthorized) {
      navigate(authentication ? "/login" : "/");
    }
  }, [isAuthorized, navigate, authentication]);

  if (!isAuthorized) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
