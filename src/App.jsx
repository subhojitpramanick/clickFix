import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { CartProvider } from './lib/CartContext';
import { ThemeProvider } from './lib/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Lazy loaded routes for better performance
import { lazy, Suspense } from 'react';
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const RepairsPage = lazy(() => import('./pages/RepairsPage'));
const RepairDetailPage = lazy(() => import('./pages/RepairDetailPage'));
const BookRepairPage = lazy(() => import('./pages/BookRepairPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={
                  <Suspense fallback={<LoadingFallback />}>
                    <HomePage />
                  </Suspense>
                } />
                <Route path="products" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductsPage />
                  </Suspense>
                } />
                <Route path="products/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProductDetailPage />
                  </Suspense>
                } />
                <Route path="repairs" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <RepairsPage />
                  </Suspense>
                } />
                <Route path="repairs/book" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <BookRepairPage />
                  </Suspense>
                } />
                <Route path="repairs/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <RepairDetailPage />
                  </Suspense>
                } />
                <Route path="cart" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CartPage />
                  </Suspense>
                } />
                <Route path="checkout" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <CheckoutPage />
                  </Suspense>
                } />
                <Route path="login" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <LoginPage />
                  </Suspense>
                } />
                <Route path="register" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <RegisterPage />
                  </Suspense>
                } />
                <Route path="account" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AccountPage />
                  </Suspense>
                } />
                <Route path="*" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <NotFoundPage />
                  </Suspense>
                } />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 