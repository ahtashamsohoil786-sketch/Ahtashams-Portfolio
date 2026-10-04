'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import type { Project } from '@/lib/types';

export default function Admin({ authed, projects }: { authed: boolean; projects: Project[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [pct, setPct] = useState(0);
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get('password');
    const r = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ password }) });
    if (r.ok) router.refresh(); else setMsg((await r.json()).error || 'Login failed');
  }

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const vf = f.get('video') as File, imf = f.get('image') as File;
    const hasV = vf.size > 0, hasI = imf.size > 0;
    if (!hasV && !hasI) { setMsg('Choose a video or an image.'); return; }
    setBusy(true); setMsg(''); setPct(0);
    const up = async (file: File, share: number, base: number) =>
      (await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/upload', onUploadProgress: ({ percentage }) => setPct(base + percentage * share) })).url;
    try {
      const video = hasV ? await up(vf, hasI ? 0.9 : 1, 0) : undefined;
      const image = hasI ? await up(imf, hasV ? 0.1 : 1, hasV ? 90 : 0) : undefined;
      const r = await fetch('/api/projects', { method: 'POST', body: JSON.stringify({ title: f.get('title'), category: f.get('category'), type: f.get('type'), description: f.get('description'), video, image }) });
      if (!r.ok) throw new Error((await r.json()).error || 'Could not save');
      form.reset(); setMsg('Published. It is now live on your site.'); router.refresh();
    } catch (err) { setMsg((err as Error).message); }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this project and its files?')) return;
    await fetch('/api/projects?id=' + id, { method: 'DELETE' });
    router.refresh();
  }

  if (!authed) return (
    <div className="admin"><h2>Owner login</h2>
      <form onSubmit={login} style={{ marginTop: 24 }}>
        <label htmlFor="pw">Password</label><input id="pw" name="password" type="password" required />
        <button className="btn">Log in</button>
      </form>
      {msg && <p role="alert" className="sub">{msg}</p>}
    </div>
  );

  return (
    <div className="admin"><h2>Upload new work</h2>
      <form onSubmit={add} style={{ marginTop: 24 }}>
        <label htmlFor="t">Title</label><input id="t" name="title" required maxLength={120} />
        <label htmlFor="c">Category</label>
        <select id="c" name="category"><option>Product Advertising</option><option>AI Commercial</option><option>Social Ad</option><option>UGC-Style Ad</option><option>Brand Film</option></select>
        <label htmlFor="ty">Is this paid client work?</label>
        <select id="ty" name="type"><option>Concept</option><option>Client Work</option></select>
        <label htmlFor="d">Description</label><textarea id="d" name="description" rows={4} maxLength={2000} />
        <label htmlFor="v">Video (MP4, WebM or MOV, up to 500 MB)</label><input id="v" name="video" type="file" accept="video/mp4,video/webm,video/quicktime" />
        <label htmlFor="i">Thumbnail / photo (JPG, PNG or WebP)</label><input id="i" name="image" type="file" accept="image/jpeg,image/png,image/webp" />
        {busy && <div className="bar" aria-label="Upload progress"><i style={{ width: pct + '%' }} /></div>}
        <button className="btn" disabled={busy}>{busy ? `Uploading ${Math.round(pct)}%` : 'Publish'}</button>
      </form>
      {msg && <p role="status" className="sub">{msg}</p>}
      <h2 style={{ fontSize: '1.6rem', marginTop: 56 }}>Your projects</h2>
      {projects.map((p) => (
        <div className="item" key={p.id}><span>{p.title} <span className="tag">{p.type}</span></span>
          <button className="btn ghost" onClick={() => remove(p.id)}>Delete</button></div>
      ))}
      {!projects.length && <p className="sub">Nothing uploaded yet.</p>}
    </div>
  );
}
