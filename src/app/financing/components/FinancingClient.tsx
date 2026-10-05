'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import MappedIcon from '@/components/ui/MappedIcon';

type Step = 'calc' | 'apply' | 'submitted';

interface AppForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  employmentStatus: string;
  annualIncome: string;
  creditScore: string;
  truckInterest: string;
  downPayment: string;
  loanTerm: string;
  ssn: string;
  dob: string;
}

const initialForm: AppForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  employmentStatus: '',
  annualIncome: '',
  creditScore: '',
  truckInterest: '',
  downPayment: '2000',
  loanTerm: '48',
  ssn: '',
  dob: '',
};

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

const creditBands = [
  { label: 'Excellent (720+)', value: 'excellent', rate: 6.49 },
  { label: 'Good (680–719)', value: 'good', rate: 8.99 },
  { label: 'Fair (640–679)', value: 'fair', rate: 12.49 },
  { label: 'Building (580–639)', value: 'building', rate: 16.99 },
  { label: 'Not sure', value: 'unknown', rate: 10.99 },
];

const lenders = [
  { name: 'Specialty Auto Finance', focus: 'Best rates for credit 680+', logo: 'bank' },
  { name: 'AgriLend Partners', focus: 'Farm & ranch vehicle specialists', logo: 'wheat' },
  { name: 'Pacific Coast Credit', focus: 'West Coast, flexible terms', logo: 'ocean' },
  { name: 'First National Specialty', focus: 'Nationwide, all credit types', logo: 'usflag' },
];

function calcMonthly(price: number, down: number, termMonths: number, annualRate: number) {
  const loan = price - down;
  if (loan <= 0) return 0;
  const r = annualRate / 100 / 12;
  return (loan * r) / (1 - Math.pow(1 + r, -termMonths));
}

export default function FinancingClient() {
  const [step, setStep] = useState<Step>('calc');
  const [form, setForm] = useState<AppForm>(initialForm);

  // Calculator state
  const [truckPrice, setTruckPrice] = useState(8000);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(48);
  const [creditBand, setCreditBand] = useState('good');

  const selectedBand = creditBands.find((b) => b.value === creditBand) ?? creditBands[1];
  const downAmt = Math.round((truckPrice * downPct) / 100);
  const monthly = calcMonthly(truckPrice, downAmt, term, selectedBand.rate);
  const totalCost = monthly * term + downAmt;
  const totalInterest = totalCost - truckPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitted');
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border py-12 sm:py-16">
        <div className="absolute inset-0 grid-lines-bg opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-40" />
        <div className="absolute top-8 right-8 size-64 blob-primary opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="tag-pill bg-primary/10 text-primary border border-primary/20">
              Rates from 6.49% APR
            </span>
          </div>
          <h1
            className="font-display font-bold text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}
          >
            Finance Your Kei Truck
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
            We work with lenders who actually understand specialty vehicles. No dealer markup, no
            hidden fees: just straightforward financing for your kei truck.
          </p>
          {/* Step indicator */}
          <div className="flex items-center gap-3 mt-8">
            {(['calc', 'apply'] as const).map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => s === 'calc' && setStep('calc')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    step === s || (step === 'submitted' && s === 'apply')
                      ? 'bg-primary text-primary-foreground'
                      : step === 'apply' && s === 'calc'
                        ? 'bg-muted text-foreground'
                        : 'bg-card border border-border text-muted-foreground'
                  }`}
                >
                  <span className="size-5 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  {s === 'calc' ? 'Estimate Payment' : 'Apply'}
                </button>
                {i < 1 && (
                  <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* STEP 1 - Calculator */}
        {step === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
            {/* Left - Controls */}
            <div className="flex flex-col gap-8">
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
                <h2 className="font-display font-bold text-xl text-foreground">
                  Estimate Your Monthly Payment
                </h2>

                {/* Truck Price */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-black uppercase tracking-widest text-foreground">
                      Truck Price
                    </label>
                    <span className="font-display font-bold text-primary text-lg">
                      ${truckPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3000}
                    max={20000}
                    step={500}
                    value={truckPrice}
                    onChange={(e) => setTruckPrice(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$3,000</span>
                    <span>$20,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-black uppercase tracking-widest text-foreground">
                      Down Payment
                    </label>
                    <span className="font-display font-bold text-foreground text-lg">
                      {downPct}% ({downAmt.toLocaleString()} USD)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={downPct}
                    onChange={(e) => setDownPct(Number(e.target.value))}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-foreground mb-3">
                    Loan Term
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[24, 36, 48, 60, 72].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTerm(t)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all min-h-[44px] border ${
                          term === t
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }`}
                      >
                        {t} mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-foreground mb-3">
                    Credit Score Range
                  </label>
                  <div className="flex flex-col gap-2">
                    {creditBands.map((band) => (
                      <button
                        key={band.value}
                        onClick={() => setCreditBand(band.value)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all min-h-[44px] border ${
                          creditBand === band.value
                            ? 'bg-primary/10 text-primary border-primary/40'
                            : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }`}
                      >
                        <span>{band.label}</span>
                        <span className="text-xs opacity-70">{band.rate}% APR</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lender Network */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
                  Our Lending Partners
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lenders.map((l) => (
                    <div
                      key={l.name}
                      className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3"
                    >
                      {l.logo === 'usflag' ? (
                        // eslint-disable-next-line @next/next/no-img-element -- small static UI icon
                        <img
                          src="/assets/flags/us.png"
                          alt=""
                          className="w-7 h-5 object-cover rounded-[2px]"
                        />
                      ) : (
                        <MappedIcon icon={l.logo} size={28} />
                      )}
                      <div>
                        <p className="text-sm font-bold text-foreground">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Summary */}
            <div className="flex flex-col gap-4">
              {/* Payment Card */}
              <div className="bg-card border border-primary/30 rounded-3xl p-6 sm:p-8 sticky top-24">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                  Estimated Monthly Payment
                </p>
                <div className="flex items-end gap-2 mb-1">
                  <span
                    className="font-display font-bold text-primary"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1 }}
                  >
                    ${monthly.toFixed(0)}
                  </span>
                  <span className="text-muted-foreground text-sm mb-2">/mo</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Based on {selectedBand.rate}% APR, {term}-month term
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: 'Truck Price', val: `$${truckPrice.toLocaleString()}` },
                    { label: 'Down Payment', val: `-$${downAmt.toLocaleString()}` },
                    {
                      label: 'Amount Financed',
                      val: `$${Math.max(0, truckPrice - downAmt).toLocaleString()}`,
                    },
                    { label: 'Total Interest', val: `$${Math.max(0, totalInterest).toFixed(0)}` },
                    { label: 'Total Cost', val: `$${totalCost.toFixed(0)}` },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                        {row.label}
                      </span>
                      <span className="text-sm font-bold text-foreground">{row.val}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('apply')}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform min-h-[52px]"
                >
                  Apply Now: Takes 5 Minutes
                  <Icon name="ArrowRightIcon" size={16} />
                </button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Soft credit check only, won&apos;t affect your score
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Estimate only.</strong> Actual rates depend on
                  credit history, income, and lender approval. Rates shown are representative APRs
                  for each credit tier. Final terms set by lender.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 - Application */}
        {step === 'apply' && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep('calc')}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
              >
                <Icon name="ArrowLeftIcon" size={14} />
                Back to Calculator
              </button>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8">
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                Financing Application
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form below. We&apos;ll match you with the best lender for your
                situation and get back to you within 1 business day.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: 'firstName',
                        label: 'First Name',
                        type: 'text',
                        placeholder: 'John',
                        required: true,
                      },
                      {
                        id: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                        placeholder: 'Smith',
                        required: true,
                      },
                      {
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                        placeholder: 'john@example.com',
                        required: true,
                      },
                      {
                        id: 'phone',
                        label: 'Phone',
                        type: 'tel',
                        placeholder: '(503) 555-0100',
                        required: true,
                      },
                      {
                        id: 'dob',
                        label: 'Date of Birth',
                        type: 'date',
                        placeholder: '',
                        required: true,
                      },
                      {
                        id: 'ssn',
                        label: 'Last 4 of SSN',
                        type: 'text',
                        placeholder: '••••',
                        required: true,
                      },
                    ].map((f) => (
                      <div key={f.id}>
                        <label
                          htmlFor={f.id}
                          className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                        >
                          {f.label} {f.required && <span className="text-accent">*</span>}
                        </label>
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={form[f.id as keyof AppForm]}
                          onChange={handleChange}
                          maxLength={f.id === 'ssn' ? 4 : undefined}
                          className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        State <span className="text-accent">*</span>
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={form.state}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
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
                </div>

                {/* Financial Info */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Financial Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="employmentStatus"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Employment Status <span className="text-accent">*</span>
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        required
                        value={form.employmentStatus}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      >
                        <option value="">Select…</option>
                        <option>Full-time employed</option>
                        <option>Part-time employed</option>
                        <option>Self-employed / Business owner</option>
                        <option>Retired</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="annualIncome"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Annual Income <span className="text-accent">*</span>
                      </label>
                      <select
                        id="annualIncome"
                        name="annualIncome"
                        required
                        value={form.annualIncome}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      >
                        <option value="">Select range…</option>
                        <option>Under $30,000</option>
                        <option>$30,000 – $50,000</option>
                        <option>$50,000 – $75,000</option>
                        <option>$75,000 – $100,000</option>
                        <option>Over $100,000</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="creditScore"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Credit Score Range <span className="text-accent">*</span>
                      </label>
                      <select
                        id="creditScore"
                        name="creditScore"
                        required
                        value={form.creditScore}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      >
                        <option value="">Select…</option>
                        {creditBands.map((b) => (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Truck Info */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Truck You Want to Finance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="truckInterest"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Truck / Description
                      </label>
                      <input
                        id="truckInterest"
                        name="truckInterest"
                        type="text"
                        placeholder="e.g. 1998 Suzuki Carry Dump 4WD, or describe what you're looking for"
                        value={form.truckInterest}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="downPayment"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Planned Down Payment
                      </label>
                      <input
                        id="downPayment"
                        name="downPayment"
                        type="text"
                        placeholder="e.g. $2,000"
                        value={form.downPayment}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="loanTerm"
                        className="block text-xs font-black uppercase tracking-widest text-foreground mb-2"
                      >
                        Preferred Loan Term
                      </label>
                      <select
                        id="loanTerm"
                        name="loanTerm"
                        value={form.loanTerm}
                        onChange={handleChange}
                        className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[48px]"
                      >
                        {[24, 36, 48, 60, 72].map((t) => (
                          <option key={t} value={t}>
                            {t} months
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-muted/30 rounded-2xl p-4 border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    By submitting this application, you authorize KeiTruckNation to share your
                    information with our lending partners for the purpose of obtaining a financing
                    quote. This is a <strong className="text-foreground">soft inquiry only</strong>{' '}
                    and will not affect your credit score. Final credit decisions are made by the
                    lender.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform min-h-[52px]"
                >
                  Submit Application
                  <Icon name="ArrowRightIcon" size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEP 3 - Submitted */}
        {step === 'submitted' && (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckBadgeIcon" size={40} className="text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Application Received
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Thanks, <strong className="text-foreground">{form.firstName}</strong>. We&apos;ve
              received your financing application and will match you with the best lender for your
              situation. Expect a response at{' '}
              <strong className="text-foreground">{form.email}</strong> within 1 business day, often
              same day.
            </p>
            <div className="bg-card border border-border rounded-2xl p-5 mb-8 text-left">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                What Happens Next
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: 'EnvelopeIcon', text: "You'll receive a confirmation email shortly" },
                  { icon: 'UserIcon', text: 'A team member reviews your application' },
                  {
                    icon: 'CurrencyDollarIcon',
                    text: 'We match you with the best lender for your profile',
                  },
                  { icon: 'PhoneIcon', text: 'Lender contacts you with pre-approval terms' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as 'EnvelopeIcon'} size={14} className="text-primary" />
                    </div>
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[44px]"
              >
                Browse Trucks
              </Link>
              <button
                onClick={() => {
                  setForm(initialForm);
                  setStep('calc');
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors min-h-[44px]"
              >
                New Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
