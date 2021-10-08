import React from 'react';
import Header from './Header';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="bg-indigo-100 min-h-screen ">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
