import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WishlistClient from './components/WishlistClient';

export const metadata = {
  title: 'Wishlist - KeiTruckNation',
  description: 'Save your favorite kei trucks and parts for later.',
};

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <WishlistClient />
      </main>
      <Footer />
    </>
  );
}
