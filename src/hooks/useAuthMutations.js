import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth.api';

export const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: logout,
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: (data) => authApi.changePassword(data),
  });
