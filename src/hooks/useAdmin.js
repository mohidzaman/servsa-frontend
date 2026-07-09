import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';

export const ADMIN_KEYS = {
  stats: ['admin', 'stats'],
  list: ['admin', 'list'],
  activity: (params) => ['admin', 'activity', params],
  activityStats: ['admin', 'activity', 'stats'],
};

export const useAdminStats = () =>
  useQuery({
    queryKey: ADMIN_KEYS.stats,
    queryFn: () => adminApi.getStats().then((r) => r.data),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

export const useAdmins = () =>
  useQuery({
    queryKey: ADMIN_KEYS.list,
    queryFn: () => adminApi.getAll().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

export const useAdminActivity = (params) =>
  useQuery({
    queryKey: ADMIN_KEYS.activity(params),
    queryFn: () => adminApi.getActivity(params).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });

export const useAdminActivityStats = () =>
  useQuery({
    queryKey: ADMIN_KEYS.activityStats,
    queryFn: () => adminApi.getActivityStats().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
