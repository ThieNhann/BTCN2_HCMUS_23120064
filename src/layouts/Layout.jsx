import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex min-h-screen w-4/5 flex-col justify-self-center gap-1">
      <Header />
      
      <Navigation />
      
      <main className="container mx-auto flex-grow p-4">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
}