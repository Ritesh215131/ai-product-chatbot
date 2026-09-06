import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { ChatProvider } from './context/ChatContext';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { ProductsPage } from './pages/ProductsPage';
import { ComparePage } from './pages/ComparePage';
import { SavedProductsPage } from './pages/SavedProductsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProductProvider>
            <ChatProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Landing Page */}
                  <Route path="/" element={<LandingPage />} />

                  {/* Authentication Pages */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Application Main Layout with Sidebar and Header */}
                  <Route element={<AppLayout />}>
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/saved" element={<SavedProductsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>

                  {/* Fallback to Landing */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </ChatProvider>
          </ProductProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
