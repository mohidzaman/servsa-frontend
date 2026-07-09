import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/ProtectedRoute';
import { PublicLayout } from './components/layout/PublicLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import SkeletonHero from './components/ui/SkeletonHero';
import { AnalyticsScripts, usePageViewTracking } from './hooks/useAnalytics';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from './seo/SeoSchema';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const PortfolioDetailPage = lazy(() => import('./pages/PortfolioDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function GlobalSeo() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <LocalBusinessSchema />
    </>
  );
}

function PageTracker() {
  usePageViewTracking();
  return null;
}

function AppContent() {
  return (
    <>
      <GlobalSeo />
      <PageTracker />
      <AnalyticsScripts />
      <ScrollToTop />
      <Suspense fallback={<SkeletonHero />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetailPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="portfolio/:id" element={<PortfolioDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
            <Route path="faq" element={<FaqPage />} />
          </Route>

          <Route
            path="admin/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
