import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role} & ${site.brand}`, template: `%s | ${site.name}` },
  description: site.desc,
  alternates: { canonical: '/' },
  openGraph: { title: `${site.name} | ${site.role} & ${site.brand}`, description: site.desc, type: 'website', siteName: site.brand },
  twitter: { card: 'summary_large_image' },
};

const ld = {
  '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.role, url: site.url,
  brand: { '@type': 'Brand', name: site.brand }, sameAs: [site.linkedin, site.fiverr].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <nav aria-label="Main"><div className="wrap">
          <Link href="/" className="logo">AHT.</Link>
          <div className="links">
            <Link href="/#work">Work</Link><Link className="hide" href="/#services">Services</Link>
            <Link className="hide" href="/#about">About</Link><Link href="/#contact">Contact</Link>
          </div>
        </div></nav>
        <main>{children}</main>
        <footer><div className="wrap">
          <p>© {new Date().getFullYear()} {site.name}. {site.brand}, an AI advertising brand.</p>
          <p><Link href="/admin">Owner login</Link></p>
        </div></footer>
      </body>
    </html>
  );
}
