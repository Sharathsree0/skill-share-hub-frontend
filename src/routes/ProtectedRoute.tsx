import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/redux";
import type { UserRole } from "../shared/types/user.Type";

function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) return <h1>Loading...</h1>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;