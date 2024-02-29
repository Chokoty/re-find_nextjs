import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = siteConfig.mainDomain;
  return [
    {
      url: domain,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${domain}/gallery`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${domain}/artists`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${domain}/events`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${domain}/search`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${domain}/more`,
      lastModified: new Date(),
      priority: 0.3,
    },
  ];
}
