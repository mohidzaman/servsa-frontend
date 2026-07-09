import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SkeletonHero from '../ui/SkeletonHero';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, admin } = useAuth();
  const location = useLocation();

  if (isLoading) return <SkeletonHero />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && admin?.role !== requiredRole) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SkeletonHero />;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  return children;
};
