---
name: publish-post
description: Publish a draft blog post on abbott.sh (proofread, remove draft flag, open a PR, confirm deploy after merge) and offer to hand off to the cross-post skill. Use when the user says to publish, ship, or go live with a blog post.
---

# Publish a blog post

Repo: `abbottships/abbottships.github.io` (deploys `abbott.sh` via GitHub Actions
on push to `master`).

## Steps

1. **Identify the post.** If the user named a slug/title, use it. Otherwise look in
   `src/content/blog/` for files with `draft: true` in frontmatter and ask which one
   if more than one matches.

2. **Proofread.** Read the full post closely — not just a leftover-placeholder
   check. Flag: typos, grammar, awkward or unclear phrasing, inconsistent
   terminology, claims that read like they need a second look, and structural
   issues (a section that doesn't land, a missing conclusion). Also flag anything
   obviously unfinished (TODO markers, empty `description`, placeholder sentences).
   Present findings as a list of suggestions, not silent edits — the user decides
   which to accept. Apply only the ones they approve.

3. **Remove the draft flag.** Delete the `draft: true` line (or set it to `false`,
   matching the existing convention in the file) from the frontmatter. Confirm the
   `pubDate` is sensible (today or the intended date).

4. **Build check.** Run `npm run build` locally. If it fails, stop and report the
   error — do not open a PR with a broken build.

5. **Confirm before pushing.** Show the user the diff and the post's eventual live
   URL (`https://abbott.sh/blog/<slug>/`). Get an explicit go-ahead before creating
   a branch/commit/PR, same as any other push to this repo.

6. **Branch, commit, and open a PR.** Create a branch (e.g. `post/<slug>`), commit
   with a plain factual message (e.g. `Publish "<post title>"`), push the branch,
   and open a PR with `gh pr create` summarizing what's being published. Do **not**
   push directly to `master` and do **not** merge the PR yourself — merging is the
   user's final go/no-go, separate from drafting the PR.

7. **Stop and hand back.** Give the user the PR URL and stop. Deploy only fires
   once they merge it (push to `master` triggers the Actions workflow). If they
   ask you to check deploy status after merging, use
   `gh run list --repo abbottships/abbottships.github.io --limit 1`. If the GitHub
   Pages "Deploy from a branch" vs "GitHub Actions" source setting ever reverts,
   see the `cross-post` skill's notes — that's a known failure mode that silently
   blocks deploys (deploy job rejected with "Deployments are only allowed from
   gh-pages").

8. **Offer to cross-post.** Once the PR is merged and the deploy is confirmed,
   ask if the user wants to invoke the `cross-post` skill with the post's title,
   description, and canonical URL. Don't invoke it automatically, and don't invoke
   it before the post is actually live.
