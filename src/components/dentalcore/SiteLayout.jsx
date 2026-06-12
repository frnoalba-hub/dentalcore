import { Outlet } from 'react-router-dom';
import Header from './Header';
import SiteFooter from './SiteFooter';
import CartDrawer from '../cart/CartDrawer';

/**
 * Shared shell for all public storefront routes: fixed header (with cart),
 * page content via router outlet, site-wide footer, and the cart drawer.
 * Pages must not render Header/CartDrawer themselves.
 */
export default function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
