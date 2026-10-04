import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/store';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ps = await getProjects();
  return [{ url: site.url, lastModified: new Date() }, ...ps.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: new Date(p.createdAt) }))];
}
