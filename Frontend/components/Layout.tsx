import React from 'react';
import Header from './Header';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="min-h-screen bg-indigo-50 ">
      <Header />
      <main className="px-2 pt-4 mx-auto sm:max-w-screen-sm md:max-w-screen-md">{children}</main>
    </div>
  );
}

export default Layout;
