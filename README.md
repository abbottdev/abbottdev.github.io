# abbott.sh

Personal site and blog for James Abbott, built with [Astro](https://astro.build) and deployed to GitHub Pages at [abbott.sh](https://abbott.sh).

## Writing a post

1. Add a Markdown or MDX file to `src/content/blog/`. The file name becomes the URL (`my-post.md` → `/blog/my-post/`).
2. Fill in the frontmatter:

   ```yaml
   ---
   title: 'Post title'
   description: 'One sentence shown in lists, RSS and link previews.'
   pubDate: 2026-11-01
   tags: ['architecture']
   draft: true # remove when ready to publish
   ---
   ```

3. Preview with `npm run dev`. Drafts show locally but are left out of the live site.
4. Merge to `master` and the site deploys automatically.

## Local development

Requires Node 24 (see `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Custom domain

`public/CNAME` sets the domain to `abbott.sh`. The DNS for `abbott.sh` needs:

- `A` records for the apex pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `AAAA` records pointing to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- Optionally a `CNAME` for `www` pointing to `abbottships.github.io`

In the repository's **Settings → Pages**, set the source to **GitHub Actions**, then add `abbott.sh` as the custom domain and tick **Enforce HTTPS**.
