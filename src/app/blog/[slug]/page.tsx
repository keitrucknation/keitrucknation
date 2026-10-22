import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import ShareButtons from '../components/ShareButtons';
import {
  articles,
  AUTHORS,
  getArticleBySlug,
  getRelatedArticles,
  type ArticleSection,
} from '../data/articles';

interface Props {
  params: Promise<{ slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const url = `${baseUrl}/blog/${article.slug}`;
  return {
    title: `${article.title} | KeiTruckNation`,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url,
      siteName: 'KeiTruckNation',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.isoDate,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: { canonical: url },
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function Section({ section }: { section: ArticleSection }) {
  return (
    <section className="mb-10">
      {section.heading && (
        <h2
          id={slugify(section.heading)}
          className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4 scroll-mt-28"
        >
          {section.heading}
        </h2>
      )}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="space-y-3 mb-4">
          {section.list.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground text-base leading-relaxed">
              <span className="mt-2 size-2 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.callout && (
        <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="LightBulbIcon" size={18} className="text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">
              {section.callout.title}
            </span>
          </div>
          <p className="text-foreground/90 text-sm sm:text-base leading-relaxed">
            {section.callout.text}
          </p>
        </div>
      )}
    </section>
  );
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const toc = (article.body ?? []).filter((s) => s.heading).map((s) => s.heading as string);
  const url = `${baseUrl}/blog/${article.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'KeiTruckNation',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/assets/images/app_logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <article className="pt-24 sm:pt-28">
          {/* Article header */}
          <div className="relative overflow-hidden border-b border-border">
            <div className="absolute inset-0 grid-lines-bg opacity-30" />
            <div className="absolute inset-0 hero-glow opacity-40" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
              <span className="tag-pill bg-accent/10 text-accent border border-accent/20">
                {article.category}
              </span>
              <h1
                className="font-display font-bold text-foreground mt-4 mb-4"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.25rem)', lineHeight: 1.08 }}
              >
                {article.title}
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-6">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="UserIcon" size={14} className="text-primary" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-foreground font-bold text-sm">{article.author}</div>
                    {AUTHORS[article.author] && (
                      <div className="text-xs">{AUTHORS[article.author]}</div>
                    )}
                  </div>
                </div>
                <span className="size-1 rounded-full bg-border" />
                <span>{article.date}</span>
                <span className="size-1 rounded-full bg-border" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-px pt-8 sm:pt-10">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border">
              <AppImage
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Body + sidebar */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-14">
            <div className="min-w-0 max-w-3xl">
              {(article.body ?? []).map((section, i) => (
                <Section key={i} section={section} />
              ))}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-bold text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Keep reading - internal links */}
              {article.related && article.related.length > 0 && (
                <div className="mt-10 bg-card border border-border rounded-2xl p-6">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
                    Next steps
                  </h2>
                  <ul className="space-y-2">
                    {article.related.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          className="group flex items-center justify-between gap-3 py-2 text-foreground hover:text-primary transition-colors"
                        >
                          <span className="font-bold text-sm sm:text-base">{r.label}</span>
                          <Icon
                            name="ArrowRightIcon"
                            size={16}
                            className="text-primary group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              {toc.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-5 hidden lg:block">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">
                    In this article
                  </h2>
                  <ol className="space-y-2">
                    {toc.map((h) => (
                      <li key={h}>
                        <a
                          href={`#${slugify(h)}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors leading-snug block"
                        >
                          {h}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <ShareButtons url={url} title={article.title} />
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                <h2 className="font-display font-bold text-lg text-foreground mb-2">
                  Ready for your own?
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Every truck is inspected, imported and titled-ready.
                </p>
                <Link
                  href="/inventory"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform min-h-[44px]"
                >
                  <Icon name="TruckIcon" size={16} />
                  Browse inventory
                </Link>
              </div>
            </aside>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <h2 className="font-display font-bold text-2xl text-foreground">Keep reading</h2>
                  <Link
                    href="/blog"
                    className="text-xs font-black uppercase tracking-widest text-primary hover:underline"
                  >
                    All articles
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 card-hover"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <AppImage
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 tag-pill bg-background/80 backdrop-blur-sm text-foreground border border-border">
                          {r.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {r.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-bold">{r.author}</span>
                          <span>{r.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
        <Footer />
      </main>
    </>
  );
}
