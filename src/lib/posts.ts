import { getCollection } from 'astro:content';

// Drafts show in `npm run dev` but are left out of production builds.
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
