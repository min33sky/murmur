import React from 'react';
import Header from './Header';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="min-h-screen bg-indigo-50 ">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
