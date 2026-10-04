'use client';
import Link from 'next/link';
import { useRef } from 'react';
import type { Project } from '@/lib/types';

export default function Card({ p }: { p: Project }) {
  const v = useRef<HTMLVideoElement>(null);
  const stop = () => { if (v.current) { v.current.pause(); v.current.currentTime = 0; } };
  return (
    <Link href={`/work/${p.slug}`} className="card" onMouseEnter={() => v.current?.play().catch(() => {})} onMouseLeave={stop}>
      <div className="frame">
        {p.video ? <video ref={v} src={p.video} poster={p.image} muted loop playsInline preload="metadata" />
          : p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <div className="empty">Media coming soon</div>}
      </div>
      <div className="meta">
        <div><h3>{p.title}</h3><p>{p.category}</p></div>
        <span className={`tag ${p.type === 'Client Work' ? 'client' : ''}`}>{p.type}</span>
      </div>
    </Link>
  );
}
