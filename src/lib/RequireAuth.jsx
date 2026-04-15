import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

/**
 * Wraps routes that must not render for anonymous users (admin, etc.).
 * Relies on Base44 auth; API permissions should still enforce access server-side.
 */
export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoadingAuth, isLoadingPublicSettings, navigateToLogin } = useAuth();

  useEffect(() => {
    if (isLoadingAuth || isLoadingPublicSettings) return;
    if (!isAuthenticated) {
      navigateToLogin();
    }
  }, [isAuthenticated, isLoadingAuth, isLoadingPublicSettings, navigateToLogin]);

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
