import { useUserStore } from "@/store/userStore";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children }) {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} />;
  }
  return children;
}

export default ProtectedRoute;
