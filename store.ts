import { put, list } from '@vercel/blob';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';
import type { Project } from './types';

const KEY = 'projects.json';

export async function getProjects(): Promise<Project[]> {
  try {
    const { blobs } = await list({ prefix: KEY });
    const b = blobs.find((x) => x.pathname === KEY);
    if (!b) return [];
    const r = await fetch(b.url, { cache: 'no-store' });
    return (await r.json()) as Project[];
  } catch { return []; }
}
export async function saveProjects(p: Project[]) {
  await put(KEY, JSON.stringify(p), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
}
export const adminToken = () => createHash('sha256').update((process.env.ADMIN_PASSWORD || '') + ':aht').digest('hex');
export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  return (await cookies()).get('aht_admin')?.value === adminToken();
}
