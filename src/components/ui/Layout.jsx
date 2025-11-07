import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main style={{ marginLeft: 280 }} className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
