import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-03-01',
  useCdn: false,
});

const DOMAIN = 'https://ege-dershaneleri.com';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/courses', priority: '0.9', changefreq: 'weekly' },
  { path: '/study-abroad', priority: '0.8', changefreq: 'weekly' },
  { path: '/achievements', priority: '0.8', changefreq: 'weekly' },
  { path: '/staff', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

async function generateSitemap() {
  console.log('🚀 Generating sitemap...');

  try {
    // 1. Fetch Dynamic Courses
    const coursesQuery = `*[_type == "course"] { "slug": slug.current }`;
    const courses = await client.fetch(coursesQuery);
    const courseRoutes = courses.map(c => ({
      path: c.slug.startsWith('olympiad-') 
        ? `/courses/olympiad/${c.slug.replace('olympiad-', '')}`
        : `/courses/${c.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    }));

    // 2. Fetch Dynamic Blog Posts
    const blogQuery = `*[_type == "post"] { "slug": slug.current }`;
    const posts = await client.fetch(blogQuery);
    const blogRoutes = posts.map(p => ({
      path: `/blog/${p.slug}`,
      priority: '0.7',
      changefreq: 'weekly'
    }));

    const allRoutes = [...staticRoutes, ...courseRoutes, ...blogRoutes];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    console.log('✅ sitemap.xml generated successfully in /public');

    // Generate robots.txt
    const robotsContent = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml`;

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
    console.log('✅ robots.txt generated successfully in /public');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
