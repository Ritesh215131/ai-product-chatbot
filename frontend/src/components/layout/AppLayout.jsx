import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { CompareDrawer } from '../compare/CompareDrawer';
import { ProductDetailModal } from '../product/ProductDetailModal';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8fafc] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 selection:bg-brand-500 selection:text-white">
      {/* Left Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top App Header */}
        <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

        {/* Dynamic Route Pages */}
        <main className="flex-1 overflow-hidden relative flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* Floating Global Product Compare Drawer */}
      <CompareDrawer />

      {/* Global Product Specification & AI Analysis Modal */}
      <ProductDetailModal />
    </div>
  );
};
