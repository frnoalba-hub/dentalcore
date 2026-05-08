import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import OrderTracking from './pages/OrderTracking';
import AdminOrders from './pages/AdminOrders';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';
import GroupPractices from './pages/GroupPractices';
import CaliforniaHub from './pages/CaliforniaHub';
import CaliforniaMetroPage from './pages/CaliforniaMetroPage';
import CategoryHubPage from './pages/CategoryHubPage';
import BuyerGuidePage from './pages/BuyerGuidePage';
import AdminProducts from './pages/AdminProducts';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminQuotes from './pages/AdminQuotes';
import Policies from './pages/Policies';
import RequestQuote from './pages/RequestQuote';
import OrderConfirmation from './pages/OrderConfirmation';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import RequireAuth from '@/lib/RequireAuth';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Analytics from '@/components/Analytics';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

/** Legacy SPA paths → canonical URLs (query string preserved). */
function LegacyProductPathRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/product${search}`} replace />;
}

function LegacyOrderTrackingRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/track-order${search}`} replace />;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/policies" element={<Policies />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/AdminProducts" element={<Navigate to="/admin/products" replace />} />
      <Route
        path="/admin/products"
        element={
          <RequireAuth>
            <AdminProducts />
          </RequireAuth>
        }
      />
      <Route path="/p/:productSlug" element={<ProductDetail />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/ProductDetail" element={<LegacyProductPathRedirect />} />
      <Route path="/group-practices" element={<GroupPractices />} />
      <Route path="/california" element={<CaliforniaHub />} />
      <Route path="/california/:metroSlug" element={<CaliforniaMetroPage />} />
      <Route path="/c/:categorySlug" element={<CategoryHubPage />} />
      <Route path="/guides/:guideSlug" element={<BuyerGuidePage />} />
      <Route path="/request-quote" element={<RequestQuote />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/track-order" element={<OrderTracking />} />
      <Route path="/OrderTracking" element={<LegacyOrderTrackingRedirect />} />
      <Route
        path="/admin/orders"
        element={
          <RequireAuth>
            <AdminOrders />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/quotes"
        element={
          <RequireAuth>
            <AdminQuotes />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Analytics />
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App