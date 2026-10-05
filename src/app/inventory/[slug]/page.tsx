import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryPageClient from '../components/CategoryPageClient';
import { TRUCK_CATEGORIES } from '../data/categories';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRUCK_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = TRUCK_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.label} Kei Trucks | KeiTruckNation`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = TRUCK_CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={0} />
      <CategoryPageClient category={category} />
      <Footer />
    </main>
  );
}
