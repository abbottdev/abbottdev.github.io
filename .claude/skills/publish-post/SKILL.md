---
name: publish-post
description: Publish a draft blog post on abbott.sh (remove draft flag, commit, push to master, confirm deploy) and offer to hand off to the cross-post skill. Use when the user says to publish, ship, or go live with a blog post.
---

# Publish a blog post

Repo: `abbottdev.github.io` (deploys `abbott.sh` via GitHub Actions on push to `master`).

## Steps

1. **Identify the post.** If the user named a slug/title, use it. Otherwise look in
   `src/content/blog/` for files with `draft: true` in frontmatter and ask which one
   if more than one matches.

2. **Sanity-check the content.** Read the post. Flag anything obviously unfinished
   (TODO markers, placeholder sentences, missing `description`). Don't block on
   style — just flag anything that looks accidental.

3. **Remove the draft flag.** Delete the `draft: true` line (or set it to `false`,
   matching the existing convention in the file) from the frontmatter. Confirm the
   `pubDate` is sensible (today or the intended date).

4. **Build check.** Run `npm run build` locally. If it fails, stop and report the
   error — do not push a broken build.

5. **Confirm before pushing.** Show the user the diff and the post's live URL it
   will get (`https://abbott.sh/blog/<slug>/`). Pushing to `master` triggers a real
   deploy — get an explicit go-ahead before committing/pushing, same as any other
   push to this repo.

6. **Commit and push to `master`.** Use a plain, factual commit message (e.g.
   `Publish "<post title>"`). Push directly — this repo deploys straight from
   `master`, there's no PR/review step in the current workflow.

7. **Confirm the deploy succeeded.** Check the latest Actions run for this repo
   (`gh run list --repo abbottships/abbottships.github.io --limit 1`) and report
   success/failure. If the GitHub Pages "Deploy from a branch" vs "GitHub Actions"
   source setting ever reverts, see the `cross-post` skill's notes — that's a known
   failure mode that silently blocks deploys (deploy job rejected with "Deployments
   are only allowed from gh-pages").

8. **Offer to cross-post.** Once live, ask if the user wants to invoke the
   `cross-post` skill with the post's title, description, and canonical URL. Don't
   invoke it automatically — publishing the post and announcing it are separate
   decisions.
