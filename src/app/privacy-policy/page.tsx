import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - KeiTruckNation',
  description:
    'Learn how KeiTruckNation collects, uses, and protects your personal information when you use our website and services.',
};

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, place an order, submit a trade-in inquiry, or contact us for support.

**Personal Information:** Name, email address, phone number, mailing address, and billing information when you make a purchase.

**Vehicle Information:** Details about trucks you inquire about, purchase, or submit for trade-in evaluation.

**Usage Data:** Pages visited, time spent on site, referring URLs, browser type, device type, and IP address - collected automatically via cookies and analytics tools.

**Communications:** Records of emails, chat messages, and support tickets you send us.`,
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Process and fulfill your orders, including coordinating import logistics and 48-state delivery
• Send order confirmations, shipping updates, and import status notifications
• Respond to your inquiries and provide customer support
• Send promotional communications (only with your consent - you may opt out at any time)
• Improve our website, inventory listings, and overall service quality
• Comply with legal obligations, including customs and import documentation requirements
• Detect and prevent fraudulent transactions`,
  },
  {
    id: 'information-sharing',
    title: '3. Information Sharing',
    content: `We do not sell, rent, or trade your personal information to third parties for their marketing purposes.

We may share your information with:

**Service Providers:** Shipping carriers, payment processors, customs brokers, and IT service providers who assist us in operating our business. These parties are contractually obligated to protect your data.

**Legal Requirements:** When required by law, court order, or government authority, or to protect the rights, property, or safety of KeiTruckNation, our customers, or others.

**Business Transfers:** In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.`,
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking Technologies',
    content: `We use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic.

**Essential Cookies:** Required for the website to function (shopping cart, session management).

**Analytics Cookies:** Help us understand how visitors interact with our site (e.g., Google Analytics). This data is aggregated and anonymous.

**Marketing Cookies:** Used to deliver relevant advertisements. You may opt out via your browser settings or our cookie preference center.

You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.`,
  },
  {
    id: 'data-security',
    title: '5. Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:

• SSL/TLS encryption for all data transmitted between your browser and our servers
• Secure payment processing - we do not store full credit card numbers on our servers
• Access controls limiting employee access to personal data on a need-to-know basis
• Regular security assessments and vulnerability testing

No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights & Choices',
    content: `Depending on your location, you may have the following rights regarding your personal data:

**Access:** Request a copy of the personal information we hold about you.

**Correction:** Request correction of inaccurate or incomplete information.

**Deletion:** Request deletion of your personal data, subject to certain legal exceptions.

**Opt-Out:** Unsubscribe from marketing emails at any time using the link in any email we send.

**California Residents (CCPA):** You have the right to know what personal information is collected, to opt out of the sale of personal information (we do not sell personal data), and to non-discrimination for exercising your rights.

To exercise any of these rights, contact us at privacy@keitrucknation.com.`,
  },
  {
    id: 'data-retention',
    title: '7. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including:

• Order records: 7 years (for tax and legal compliance)
• Account information: Until account deletion is requested
• Marketing preferences: Until you opt out or request deletion
• Import documentation: As required by U.S. Customs and Border Protection regulations`,
  },
  {
    id: 'third-party-links',
    title: '8. Third-Party Links',
    content: `Our website may contain links to third-party websites, including auction houses, shipping carriers, and financing partners. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    id: 'childrens-privacy',
    title: "9. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will take steps to delete it.`,
  },
  {
    id: 'changes',
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes by posting the updated policy on this page with a revised "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**KeiTruckNation Privacy Team**
Email: privacy@keitrucknation.com
Phone: Available on our Contact page
Mailing Address: Available upon request

We aim to respond to all privacy-related inquiries within 5 business days.`,
  },
];

export default function PrivacyPolicyPage() {
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
            <span className="text-foreground">Privacy Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-base">
            Last updated: <time dateTime="2026-01-01">January 1, 2026</time>
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            KeiTruckNation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services to purchase
            imported Japanese kei trucks and parts.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-muted/40 border border-border rounded-xl p-5 mb-10">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Table of Contents
          </h2>
          <ol className="space-y-1.5">
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
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return null;
                  }
                  // Render paragraphs with bold markdown
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
            Questions about your data? We&apos;re here to help.
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
