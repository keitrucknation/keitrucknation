import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions - KeiTruckNation',
  description:
    'Read the Terms and Conditions governing your use of KeiTruckNation and the purchase of imported Japanese kei trucks and parts.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing or using the KeiTruckNation website (keitrucknation.com) or purchasing any products or services from us, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our website or services.

We reserve the right to modify these Terms at any time. Continued use of our services after any changes constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.`,
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content: `You must be at least 18 years of age to purchase from KeiTruckNation. By placing an order, you represent and warrant that you are of legal age and have the legal capacity to enter into a binding contract.

You are responsible for ensuring that the import, registration, and operation of any vehicle purchased from us complies with all applicable federal, state, and local laws in your jurisdiction. KeiTruckNation does not guarantee that any specific vehicle will be street-legal in your state - please review our State Guide or consult local authorities before purchasing.`,
  },
  {
    id: 'vehicle-sales',
    title: '3. Vehicle Sales & Pricing',
    content: `**Pricing:** All prices are listed in U.S. Dollars (USD). Prices are subject to change without notice. The price at the time of order confirmation is the price you will be charged.

**Vehicle Condition:** All kei trucks are imported used vehicles sourced from Japanese auction houses. Vehicles are described as accurately as possible based on auction records, inspection reports, and available documentation. Minor cosmetic imperfections are normal and expected for used imports.

**Mileage:** Odometer readings are provided in kilometers as displayed on the vehicle. KeiTruckNation is not responsible for odometer discrepancies that may exist in original auction records.

**Year & Specifications:** Vehicle year, engine specifications, and features are provided based on available documentation. Specifications may vary from U.S. market equivalents.

**Deposits:** A non-refundable deposit may be required to secure a specific vehicle. Deposit amounts will be clearly communicated at the time of purchase.`,
  },
  {
    id: 'import-process',
    title: '4. Import Process & Timeline',
    content: `**Timeline:** The standard import process takes approximately 8–12 weeks from purchase confirmation to delivery. This timeline is an estimate and may vary due to auction availability, shipping schedules, port congestion, and customs processing times.

**Paperwork:** KeiTruckNation handles all standard import documentation, including the Bill of Lading, Japanese Export Certificate, and U.S. Customs Entry. You are responsible for any state-level registration and titling requirements.

**Marine Insurance:** Marine insurance is included on all vehicle shipments. Coverage applies from the point of loading in Japan to arrival at the U.S. port of entry.

**Customs Duties:** Import duties and fees are included in the quoted price unless otherwise stated. Any additional fees imposed by U.S. Customs and Border Protection beyond standard rates are the buyer's responsibility.

**Force Majeure:** KeiTruckNation is not liable for delays caused by events beyond our reasonable control, including natural disasters, port strikes, government actions, or global shipping disruptions.`,
  },
  {
    id: 'shipping-delivery',
    title: '5. Shipping & Delivery',
    content: `**Domestic Delivery:** We offer 48-state delivery. Hawaii and Alaska may incur additional shipping charges and extended timelines. Alaska and Hawaii deliveries are quoted separately.

**Shipping Methods:** Standard shipping (6–8 weeks domestic transit after port arrival) and Expedited shipping (2–3 weeks) are available. Shipping costs are calculated at checkout.

**Free Shipping:** Orders of 3 or more trucks qualify for free standard domestic shipping.

**Delivery Address:** You are responsible for providing an accurate delivery address. KeiTruckNation is not responsible for failed deliveries due to incorrect address information.

**Risk of Loss:** Title and risk of loss transfer to the buyer upon delivery to the carrier at the U.S. port of entry.`,
  },
  {
    id: 'returns-refunds',
    title: '6. Returns & Refunds',
    content: `**All Sales Final:** Due to the nature of imported used vehicles, all sales are final once the vehicle has been shipped from Japan. We strongly encourage buyers to review all available documentation, photos, and inspection reports before confirming a purchase.

**Pre-Shipment Cancellation:** If you wish to cancel an order before the vehicle has been shipped from Japan, you may do so with written notice. Non-refundable deposits will not be returned. Any additional amounts paid beyond the deposit will be refunded within 10 business days.

**Parts Returns:** Genuine parts and accessories may be returned within 30 days of delivery if unused, in original packaging, and accompanied by proof of purchase. Buyer is responsible for return shipping costs. Electrical components and special-order parts are non-returnable.

**Damaged Shipments:** If a vehicle or parts arrive visibly damaged, you must document the damage at delivery and notify us within 48 hours. Marine insurance claims will be filed on your behalf for damage occurring during ocean transit.`,
  },
  {
    id: 'warranties',
    title: '7. Warranties & Disclaimers',
    content: `**No Implied Warranty:** All vehicles are sold "as-is" unless a specific written warranty is provided at the time of sale. KeiTruckNation makes no implied warranties of merchantability or fitness for a particular purpose.

**Inspection Reports:** We provide auction-grade inspection reports where available. These reports are prepared by third-party Japanese auction houses and are provided for informational purposes only. KeiTruckNation does not independently verify all inspection findings.

**Street Legality:** KeiTruckNation does not warrant that any vehicle is street-legal in any particular U.S. state. Many kei trucks are sold for off-road, farm, or private property use. Buyers are solely responsible for determining legal use in their jurisdiction.

**Parts Compatibility:** While we make every effort to list accurate compatibility information, buyers are responsible for verifying that parts are compatible with their specific vehicle before purchase.`,
  },
  {
    id: 'payments',
    title: '8. Payment Terms',
    content: `**Accepted Payment Methods:** We accept Bank Transfer, Visa, CashApp, Zelle, Chime, Apple Pay, and Bitcoin (BTC).

**Bitcoin Discount:** A 10% discount is automatically applied to the total order amount when payment is made via Bitcoin. This discount is applied at checkout and reflected in the final invoice.

**Payment Security:** All payment transactions are processed through secure, encrypted channels. KeiTruckNation does not store full payment card numbers on our servers.

**Failed Payments:** If a payment fails or is reversed, KeiTruckNation reserves the right to cancel the associated order and release any reserved inventory.

**Currency:** All transactions are processed in U.S. Dollars. For Bitcoin payments, the BTC equivalent is calculated at the exchange rate at the time of payment confirmation.`,
  },
  {
    id: 'trade-in',
    title: '9. Trade-In Program',
    content: `**Valuation:** Trade-in valuations are estimates based on the information you provide. Final trade-in value is determined upon physical inspection of the vehicle.

**Condition Accuracy:** You are responsible for accurately representing the condition of your trade-in vehicle. Misrepresentation may result in a revised valuation or cancellation of the trade-in offer.

**Offer Validity:** Trade-in offers are valid for 7 days from the date of the written offer, subject to no material change in the vehicle's condition.`,
  },
  {
    id: 'intellectual-property',
    title: '10. Intellectual Property',
    content: `All content on the KeiTruckNation website - including text, images, logos, graphics, and software - is the property of KeiTruckNation or its content suppliers and is protected by U.S. and international copyright laws.

You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission. Limited personal, non-commercial use is permitted for informational purposes.`,
  },
  {
    id: 'limitation-liability',
    title: '11. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, KeiTruckNation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or products, including but not limited to loss of profits, data, or goodwill.

Our total liability to you for any claim arising from these Terms or your use of our services shall not exceed the amount you paid for the specific product or service giving rise to the claim.`,
  },
  {
    id: 'governing-law',
    title: '12. Governing Law & Disputes',
    content: `These Terms are governed by the laws of the United States. Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.

You waive any right to participate in a class action lawsuit or class-wide arbitration against KeiTruckNation.`,
  },
  {
    id: 'contact',
    title: '13. Contact Information',
    content: `For questions about these Terms and Conditions, please contact us:

**KeiTruckNation Legal**
Email: legal@keitrucknation.com
For general inquiries, visit our Contact page.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Terms & Conditions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-base">
            Last updated: <time dateTime="2026-01-01">January 1, 2026</time>
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Please read these Terms and Conditions carefully before using KeiTruckNation&apos;s website
            or purchasing any products or services. These Terms govern your relationship with
            KeiTruckNation and outline the rights and responsibilities of both parties.
          </p>
        </div>

        {/* Important notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10 flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> All kei truck sales are final once the vehicle has been
            shipped from Japan. Please review all documentation carefully before confirming your
            purchase.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-muted/40 border border-border rounded-xl p-5 mb-10">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Table of Contents
          </h2>
          <ol className="grid sm:grid-cols-2 gap-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-sm text-primary hover:underline">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border">
                {section.title}
              </h2>
              <div className="text-foreground/80 leading-relaxed space-y-3">
                {section.content.split('\n\n').map((para, i) => {
                  const rendered = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return (
                    <p
                      key={i}
                      className="text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: rendered }}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Have questions about our terms? We&apos;re happy to clarify.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
