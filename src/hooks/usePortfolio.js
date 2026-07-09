import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '../api/portfolio.api';

export const PORTFOLIO_KEYS = {
  all: ['portfolio'],
  list: (params) => ['portfolio', 'list', params],
  detail: (id) => ['portfolio', 'detail', id],
};

export const usePortfolio = (params) =>
  useQuery({
    queryKey: PORTFOLIO_KEYS.list(params),
    queryFn: () => portfolioApi.getAll(params).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

export const usePortfolioProject = (id) =>
  useQuery({
    queryKey: PORTFOLIO_KEYS.detail(id),
    queryFn: () => portfolioApi.getById(id).then((r) => r.data),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
