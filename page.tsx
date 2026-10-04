import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/store';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.description || `${p.title}, ${p.category}`, alternates: { canonical: `/work/${p.slug}` } } : {};
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <section><div className="wrap">
      <p style={{ color: 'var(--c)' }}>{p.type} · {p.category}</p>
      <h1 style={{ marginTop: 12, fontSize: 'clamp(2.4rem,7vw,6rem)' }}>{p.title}</h1>
      <div className="frame" style={{ marginTop: 40 }}>
        {p.video ? <video src={p.video} poster={p.image} controls playsInline preload="metadata" />
          : p.image ? <img src={p.image} alt={p.title} /> : <div className="empty">Preview unavailable.</div>}
      </div>
      {p.description && <p className="sub" style={{ whiteSpace: 'pre-line' }}>{p.description}</p>}
      <div className="row"><Link className="btn" href="/#contact">Want an ad like this? Let's talk</Link><Link className="btn ghost" href="/#work">Back to work</Link></div>
    </div></section>
  );
}
