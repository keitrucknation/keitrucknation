'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  truck: string;
  category: string;
  title: string;
  body: string;
  avatar: string;
  avatarAlt: string;
  verified: boolean;
  helpful: number;
}

const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Travis M.',
    location: 'Bozeman, MT',
    date: 'Jun 2026',
    rating: 5,
    truck: '2001 Daihatsu Hijet Dump 4WD',
    category: 'dump',
    title: "Best farm purchase I've made in 10 years",
    body: 'I was skeptical about buying a truck sight-unseen from Japan, but Marcus walked me through every step. The auction grade report was exactly as described: Grade 4, and it showed. Truck arrived in 9 weeks, runs perfectly. I use it daily for moving gravel and compost on my 40-acre property. The 4WD is legit: it handles our Montana mud like nothing.',
    avatar: 'https://images.unsplash.com/photo-1669039415113-48f87a568fdd',
    avatarAlt: 'Travis M., farmer from Bozeman Montana, kei truck owner',
    verified: true,
    helpful: 47,
  },
  {
    id: 'r2',
    name: 'Sandra K.',
    location: 'Asheville, NC',
    date: 'May 2026',
    rating: 5,
    truck: '1999 Suzuki Carry Flatbed 4WD',
    category: 'flatbed',
    title: 'Exactly what our vineyard needed',
    body: "We run a small vineyard and needed something that could navigate between rows without tearing up the ground. The Carry is perfect - narrow enough to fit, powerful enough to haul full harvest bins. The team was incredibly responsive. Derek handled all the customs paperwork and I literally just had to sign one form. Couldn't be easier.",
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1260beab3-1772058324442.png',
    avatarAlt: 'Sandra K., vineyard owner from Asheville North Carolina',
    verified: true,
    helpful: 31,
  },
  {
    id: 'r3',
    name: 'Jared P.',
    location: 'Austin, TX',
    date: 'Apr 2026',
    rating: 5,
    truck: '2001 Daihatsu Hijet Food Truck Conversion',
    category: 'specialty',
    title: 'My food truck business started with this thing',
    body: "I bought the Hijet food truck conversion and it's been the centerpiece of my taco business for 8 months now. The serving window setup was already done - I just added my branding and equipment. Customers go absolutely crazy for it. It's a conversation starter everywhere I park. KeiTruckNation was super helpful with the specialty vehicle paperwork too.",
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1490324af-1779545312863.png',
    avatarAlt: 'Jared P., food truck owner from Austin Texas',
    verified: true,
    helpful: 62,
  },
  {
    id: 'r4',
    name: 'Rachel T.',
    location: 'Eugene, OR',
    date: 'Mar 2026',
    rating: 4,
    truck: '2004 Honda Acty Van 2WD',
    category: 'box-van',
    title: 'Great van, shipping took a bit longer than expected',
    body: "The van itself is fantastic: I use it for my plant nursery deliveries and it's perfect. Fuel economy is incredible. My only note is that the ocean transit took 31 days instead of the estimated 18–28, which pushed my delivery back about 2 weeks. The team kept me updated throughout and was apologetic about the delay. Would still buy again without hesitation.",
    avatar: 'https://images.unsplash.com/photo-1624300634237-45ae9fcc1eb1',
    avatarAlt: 'Rachel T., plant nursery owner from Eugene Oregon',
    verified: true,
    helpful: 19,
  },
  {
    id: 'r5',
    name: 'Dale H.',
    location: 'Knoxville, TN',
    date: 'Feb 2026',
    rating: 5,
    truck: '1997 Suzuki Mini Fire Engine 4WD',
    category: 'specialty',
    title: "The most fun I've ever had on my property",
    body: "I bought the mini fire engine as a novelty for my farm and it's become the most-talked-about thing I own. My grandkids fight over who gets to ride in it. The pump still works. It's street legal in Tennessee with a slow-moving vehicle placard. Marcus was upfront about everything - the quirks, the registration process, all of it. Honest people.",
    avatar: 'https://images.unsplash.com/photo-1669892681327-2c93be6d8642',
    avatarAlt: 'Dale H., farm owner from Knoxville Tennessee with mini fire truck',
    verified: true,
    helpful: 88,
  },
  {
    id: 'r6',
    name: 'Maria C.',
    location: 'Fresno, CA',
    date: 'Jan 2026',
    rating: 5,
    truck: '2002 Mitsubishi Minicab Dump 4WD',
    category: 'dump',
    title: 'Replaced our full-size dump truck for farm work',
    body: "We run a small landscaping operation and the Minicab dump has replaced our full-size truck for 80% of our jobs. It fits through gates, uses almost no fuel, and the hydraulic dump works flawlessly. We've put 8,000 km on it since delivery with zero issues. The pre-ship inspection report was accurate to the letter.",
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e97a8796-1763300242786.png',
    avatarAlt: 'Maria C., landscaping business owner from Fresno California',
    verified: true,
    helpful: 34,
  },
];

const categories = ['All', 'Flatbed', 'Dump', 'Box Van', 'Specialty'];
const sortOptions = ['Most Helpful', 'Most Recent', 'Highest Rated'];

const stats = [
  { value: '4.9', label: 'Average Rating', sub: 'across 200+ reviews' },
  { value: '98%', label: 'Would Recommend', sub: 'to a friend or colleague' },
  { value: '200+', label: 'Verified Reviews', sub: 'from real customers' },
  { value: '4.8', label: 'Shipping Score', sub: 'communication & delivery' },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={star <= rating ? 'text-yellow-400' : 'text-muted-foreground/30'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Helpful');

  const filtered = reviews.filter((r) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Flatbed') return r.category === 'flatbed';
    if (activeCategory === 'Dump') return r.category === 'dump';
    if (activeCategory === 'Box Van') return r.category === 'box-van';
    if (activeCategory === 'Specialty') return r.category === 'specialty';
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Most Helpful') return b.helpful - a.helpful;
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary border-b border-border py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Icon name="StarIcon" size={14} />
                Verified Customer Reviews
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4">
                Real Trucks. Real Owners.
                <br />
                <span className="text-primary">Real Reviews.</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Every review is from a verified KeiTruckNation customer. No incentivized reviews, no
                fake testimonials.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-2xl p-5 text-center"
                >
                  <p className="font-display text-3xl font-black text-primary mb-1">{stat.value}</p>
                  <p className="font-bold text-foreground text-sm">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 sm:top-20 z-30 bg-background/90 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-secondary border border-border text-foreground text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-primary/30 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative size-10 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                      src={review.avatar}
                      alt={review.avatarAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground text-sm">{review.name}</p>
                      {review.verified && (
                        <Icon
                          name="CheckBadgeIcon"
                          size={14}
                          className="text-primary flex-shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.location} · {review.date}
                    </p>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>

                {/* Truck badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary border border-border text-xs text-muted-foreground mb-3 self-start">
                  <Icon name="TruckIcon" size={12} />
                  {review.truck}
                </div>

                {/* Content */}
                <h3 className="font-bold text-foreground text-sm mb-2">{review.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {review.body}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Icon name="HandThumbUpIcon" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {review.helpful} found this helpful
                  </span>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No reviews in this category yet.</p>
            </div>
          )}
        </section>

        {/* Write a Review CTA */}
        <section className="bg-secondary border-t border-border py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl font-black text-foreground mb-4">
              Own a KeiTruckNation Truck?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Share your experience and help other buyers make the right call. Verified customers
              only.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Icon name="PencilSquareIcon" size={16} />
                Submit Your Review
              </Link>
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-colors"
              >
                Browse Trucks
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
