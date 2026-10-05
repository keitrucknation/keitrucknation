'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type InquiryType = 'truck' | 'parts' | 'shipping' | 'financing' | 'other';

interface FormState {
  name: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  truckInterest: string;
  state: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'truck',
  truckInterest: '',
  state: '',
  message: '',
};

const inquiryTypes: { value: InquiryType; label: string; icon: string }[] = [
  { value: 'truck', label: 'Specific Truck', icon: 'TruckIcon' },
  { value: 'parts', label: 'Parts & Accessories', icon: 'WrenchScrewdriverIcon' },
  { value: 'shipping', label: 'Shipping Quote', icon: 'MapPinIcon' },
  { value: 'financing', label: 'Financing', icon: 'CurrencyDollarIcon' },
  { value: 'other', label: 'General Question', icon: 'ChatBubbleLeftRightIcon' },
];

const faqs = [
  {
    q: 'Are kei trucks street legal in the US?',
    a: "It depends on your state. Most states allow kei trucks on roads with speed limits of 35–45 mph or less. Some states (like Montana, Idaho, and Vermont) have more permissive rules. We'll help you understand your state's regulations before you buy.",
  },
  {
    q: 'How long does shipping from Japan take?',
    a: 'Ocean freight from Japan to a US West Coast port takes 3–4 weeks. East Coast ports add another 1–2 weeks. Domestic freight from the port to your location is typically 3–7 business days after customs clearance.',
  },
  {
    q: 'What does the price include?',
    a: 'Our listed prices include the truck, Japanese export documentation, ocean freight, and US customs clearance. Domestic freight from the port to your location is quoted separately based on your state.',
  },
  {
    q: 'Can I get financing?',
    a: "Yes, we work with several lenders who specialize in specialty vehicles. Rates vary based on credit, down payment, and loan term. Use the financing calculator on any truck's detail page for an estimate, then contact us to apply.",
  },
  {
    q: 'Do you offer a warranty?',
    a: "Kei trucks are sold as-is, as they're used imports. However, every truck is inspected and graded before shipping. We provide the full Japanese auction inspection report so you know exactly what you're buying.",
  },
  {
    q: 'Can I request a specific truck or spec?',
    a: "Absolutely. If you're looking for a specific make, year, body type, or feature (like A/C or a dump bed), tell us and we'll source it on your behalf. We have access to hundreds of trucks at Japanese auctions weekly.",
  },
];

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export default function ContactClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          inquiryType: form.inquiryType,
          message: form.state
            ? `[State: ${form.state}]${form.truckInterest ? ` [Truck: ${form.truckInterest}]` : ''} ${form.message}`
            : form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Network error - please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-12 sm:py-16">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              We Answer Every Message
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            Ask about a truck, request a shipping quote, or tell us what you&apos;re looking for. We
            typically respond within a few hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
          {/* LEFT - Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 bg-card border border-border rounded-3xl px-8">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name="CheckIcon" size={32} className="text-primary" />
                </div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-8">
                  Thanks, <strong className="text-foreground">{form.name}</strong>. We&apos;ll get
                  back to you at <strong className="text-foreground">{form.email}</strong> within a
                  few hours, usually sooner.
                </p>
                <button
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-foreground mb-3">
                    What can we help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, inquiryType: type.value }))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all min-h-[44px] border ${
                          form.inquiryType === type.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground'
                        }`}
                      >
                        <Icon name={type.icon as 'TruckIcon'} size={14} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                    >
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                    >
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Phone + State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                    >
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(503) 555-0100"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                    >
                      Your State
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                    >
                      <option value="">Select state…</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Truck Interest (conditional) */}
                {(form.inquiryType === 'truck' || form.inquiryType === 'shipping') && (
                  <div>
                    <label
                      htmlFor="truckInterest"
                      className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                    >
                      Truck You&apos;re Interested In
                    </label>
                    <input
                      id="truckInterest"
                      name="truckInterest"
                      type="text"
                      value={form.truckInterest}
                      onChange={handleChange}
                      placeholder="e.g. 1998 Suzuki Carry Dump 4WD, or describe what you need"
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for, how you plan to use the truck, any specific requirements…"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    <Icon name="ExclamationTriangleIcon" size={16} className="flex-shrink-0" />
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto sm:self-start px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] hover:glow-lime transition-all min-h-[52px] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitting ? (
                    <>
                      <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT - Contact Info + FAQ */}
          <div className="flex flex-col gap-6">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-7">
              <h3 className="font-display font-bold text-lg text-foreground mb-5">Contact Info</h3>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: 'PhoneIcon',
                    label: 'Phone',
                    value: '(503) 555-0182',
                    sub: 'Mon–Sat, 8am–6pm PT',
                  },
                  {
                    icon: 'EnvelopeIcon',
                    label: 'Email',
                    value: 'keitrucknation@gmail.com',
                    sub: 'Replies within a few hours',
                  },
                  {
                    icon: 'MapPinIcon',
                    label: 'Office',
                    value: 'Portland, OR',
                    sub: 'Trucks at port, not a dealership lot',
                  },
                  {
                    // TODO: replace with the real WhatsApp number once provided
                    icon: 'ChatBubbleLeftRightIcon',
                    label: 'WhatsApp',
                    value: 'Coming soon',
                    sub: 'Number to be added',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon as 'PhoneIcon'} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5 flex items-start gap-4">
              <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="ClockIcon" size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">
                  Fast Response
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We respond to every inquiry, usually within 2–4 hours during business hours. For
                  urgent questions, call us directly.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-7">
              <h3 className="font-display font-bold text-lg text-foreground mb-5">
                Common Questions
              </h3>
              <div className="flex flex-col gap-0">
                {faqs.map((faq, i) => (
                  <div key={i} className={`${i < faqs.length - 1 ? 'border-b border-border' : ''}`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-3 py-4 text-left min-h-[44px]"
                    >
                      <span className="text-sm font-bold text-foreground leading-snug">
                        {faq.q}
                      </span>
                      <Icon
                        name={openFaq === i ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                        size={16}
                        className="text-muted-foreground flex-shrink-0 mt-0.5 transition-transform"
                      />
                    </button>
                    {openFaq === i && (
                      <div className="pb-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
