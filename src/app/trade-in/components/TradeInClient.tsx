'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type FormStep = 'info' | 'details' | 'submitted';

interface TradeForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  drivetrain: string;
  condition: string;
  bodyStyle: string;
  hasTitle: string;
  description: string;
  intent: string;
}

const initialForm: TradeForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zip: '',
  make: '',
  model: '',
  year: '',
  mileage: '',
  drivetrain: '',
  condition: '',
  bodyStyle: '',
  hasTitle: '',
  description: '',
  intent: '',
};

const makes = [
  'Suzuki Carry',
  'Honda Acty',
  'Daihatsu Hijet',
  'Subaru Sambar',
  'Mitsubishi Minicab',
  'Other',
];
const bodyStyles = [
  'Standard Flatbed',
  'Dump Truck',
  'Box Van / Panel Van',
  'Stake-Side Flatbed',
  'Crew Cab',
  'Refrigerated',
  'Specialty / Novelty',
  'Other',
];
const conditions = [
  { value: 'excellent', label: 'Excellent', desc: 'Runs great, minimal wear, clean title' },
  { value: 'good', label: 'Good', desc: 'Runs well, normal wear, minor cosmetic issues' },
  { value: 'fair', label: 'Fair', desc: 'Runs but needs some work, visible wear' },
  { value: 'project', label: 'Project', desc: 'Needs significant repair or restoration' },
];

const whyValues = [
  {
    icon: 'CurrencyDollarIcon',
    title: 'Cash Offers in 24 hrs',
    desc: 'Submit your truck details and get a real cash offer within one business day: no lowball games.',
  },
  {
    icon: 'TruckIcon',
    title: 'We Come to You',
    desc: 'Nationwide pickup available. We arrange transport from your location at no cost to you.',
  },
  {
    icon: 'ArrowsRightLeftIcon',
    title: 'Trade-In Credit',
    desc: "Apply your truck's value as a down payment toward any truck in our inventory. Instant equity.",
  },
  {
    icon: 'DocumentCheckIcon',
    title: 'Clean Paperwork',
    desc: 'We handle all title transfer and DMV paperwork. You sign once and we take care of the rest.',
  },
];

export default function TradeInClient() {
  const [step, setStep] = useState<FormStep>('info');
  const [form, setForm] = useState<TradeForm>(initialForm);
  const [selectedCondition, setSelectedCondition] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitted');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                <Icon name="CurrencyDollarIcon" size={14} />
                Cash Offers & Trade-Ins
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                Sell Your
                <br />
                <span className="text-primary">Kei Truck</span>
                <br />
                to Us
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Already own a kei truck? We buy them. Get a cash offer in 24 hours or trade it in
                toward something new from our inventory.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#get-offer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Get My Offer
                  <Icon name="ArrowRightIcon" size={16} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-colors"
                >
                  Talk to a Human
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1fa75a8a2-1787343437937.png"
                  alt="Kei truck parked on a farm road ready for trade-in evaluation"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Average offer paid</p>
                      <p className="font-display text-2xl font-black text-primary">$4,200–$9,800</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Response time</p>
                      <p className="font-bold text-foreground">Under 24 hrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Sell to Us */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyValues.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="get-offer" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-3">
              Get Your Free Offer
            </h2>
            <p className="text-muted-foreground">Takes 3 minutes. No obligation. No spam.</p>
          </div>

          {step === 'submitted' ? (
            <div className="bg-card border border-border rounded-2xl p-10 text-center">
              <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckBadgeIcon" size={32} className="text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-black text-foreground mb-3">
                Offer Request Received!
              </h3>
              <p className="text-muted-foreground mb-2">
                We&apos;ll review your{' '}
                <strong className="text-foreground">
                  {form.year} {form.make}
                </strong>{' '}
                and send a cash offer to <strong className="text-foreground">{form.email}</strong>{' '}
                within 24 business hours.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Questions? Call us or reply to the confirmation email we just sent.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/inventory"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Browse Inventory
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-bold text-sm uppercase tracking-widest hover:bg-muted transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-8"
            >
              {/* Step tabs */}
              <div className="flex gap-2">
                {(['info', 'details'] as FormStep[]).map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => step === 'details' && s === 'info' && setStep('info')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      step === s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {i + 1}. {s === 'info' ? 'Your Info' : 'Truck Details'}
                  </button>
                ))}
              </div>

              {step === 'info' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
                      { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Smith' },
                      {
                        name: 'email',
                        label: 'Email',
                        type: 'email',
                        placeholder: 'john@email.com',
                      },
                      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 000-0000' },
                      { name: 'zip', label: 'ZIP Code', type: 'text', placeholder: '90210' },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className={field.name === 'email' ? 'sm:col-span-2' : ''}
                      >
                        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof TradeForm]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      I want to…
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {
                          value: 'cash',
                          label: 'Get a cash offer',
                          desc: 'Sell outright for cash',
                        },
                        {
                          value: 'trade',
                          label: 'Trade in toward a new truck',
                          desc: 'Apply value as down payment',
                        },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, intent: opt.value }))}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            form.intent === opt.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <p className="font-bold text-foreground text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    disabled={!form.firstName || !form.email || !form.intent}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next: Truck Details
                    <Icon name="ArrowRightIcon" size={16} />
                  </button>
                </div>
              )}

              {step === 'details' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Make
                      </label>
                      <select
                        name="make"
                        value={form.make}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      >
                        <option value="">Select make</option>
                        {makes.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        placeholder="e.g. 2001"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Mileage (km)
                      </label>
                      <input
                        type="text"
                        name="mileage"
                        value={form.mileage}
                        onChange={handleChange}
                        placeholder="e.g. 45,000 km"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Body Style
                      </label>
                      <select
                        name="bodyStyle"
                        value={form.bodyStyle}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      >
                        <option value="">Select body style</option>
                        {bodyStyles.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Drivetrain
                      </label>
                      <select
                        name="drivetrain"
                        value={form.drivetrain}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="2WD">2WD</option>
                        <option value="4WD">4WD</option>
                        <option value="AWD">AWD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      Condition
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {conditions.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => {
                            setSelectedCondition(c.value);
                            setForm((p) => ({ ...p, condition: c.value }));
                          }}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            selectedCondition === c.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <p className="font-bold text-foreground text-sm">{c.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Do you have the title?
                    </label>
                    <div className="flex gap-3">
                      {['Yes', 'No', 'Not sure'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, hasTitle: opt }))}
                          className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all ${form.hasTitle === opt ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any modifications, known issues, recent work done, photos available, etc."
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('info')}
                      className="flex-1 py-3.5 border border-border text-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!form.make || !form.condition}
                      className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Icon name="CurrencyDollarIcon" size={16} />
                      Submit for Offer
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
