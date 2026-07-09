import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '../api/services.api';

export const SERVICES_KEYS = {
  all: ['services'],
  list: (params) => ['services', 'list', params],
  detail: (id) => ['services', 'detail', id],
  categories: ['services', 'categories'],
};

export const useServices = (params) =>
  useQuery({
    queryKey: SERVICES_KEYS.list(params),
    queryFn: () => servicesApi.getAll(params).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

export const useService = (id) =>
  useQuery({
    queryKey: SERVICES_KEYS.detail(id),
    queryFn: () => servicesApi.getById(id).then((r) => r.data),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

export const useServiceCategories = () =>
  useQuery({
    queryKey: SERVICES_KEYS.categories,
    queryFn: () => servicesApi.getCategories().then((r) => r.data),
    staleTime: 10 * 60 * 1000,
  });
