---
name: cross-post
description: Draft and stage social posts announcing a new abbott.sh blog post on LinkedIn and Bluesky using browser automation, then stop for the user to review and click post themselves. Use when the user wants to announce or cross-post a blog article to social platforms.
---

# Cross-post a blog article

Drafts platform-native copy for a published post and uses the Chrome browser
(the user's own logged-in session) to fill in each platform's compose box —
**never submits automatically**. The user reviews and clicks post/share themselves
on each platform. This is a deliberate design choice (confirmed with the user
2026-10-23) — do not change it to auto-submit without the user explicitly asking.

## Precondition

This requires the `claude-in-chrome` browser extension connected to the current
session. Load the `claude-in-chrome` skill first, before touching any
`mcp__claude-in-chrome__*` tool. If those tools aren't available, tell the user to
install/connect the extension and stop — don't try to work around it with a
different automation method.

## Inputs

Needs: post title, one-sentence description/hook, and the canonical URL
(`https://abbott.sh/blog/<slug>/`). If not given directly, read them from the
post's frontmatter in `src/content/blog/`.

X/Twitter was deliberately dropped from this skill (2026-10-23) — not a
technical limitation, just scoped out of the plan. Don't add it back without the
user asking.

## Drafting copy

Match the voice in `src/consts.ts` (`SITE_DESCRIPTION`) and `src/pages/about.md` —
staff engineer, trust & safety / AI systems, direct and unflashy. Draft two
separate versions, not one copy-pasted across platforms:

- **LinkedIn**: longer-form (a few sentences), one concrete hook or opinion from
  the post, professional tone, link at the end.
- **Bluesky**: much shorter (300 char limit), conversational, link included.

Show both drafts to the user before opening any browser tab, so they can redirect
the copy before automation starts.

## Posting mechanics (per platform)

- **Bluesky**: `https://bsky.app/intent/compose?text=<url-encoded text+link>`
  pre-fills the compose box via URL — simplest of the two, confirmed working
  2026-10-23. Requires the user to already be logged into Bluesky in the Chrome
  profile the extension is attached to; if the intent silently redirects to the
  logged-out Discover feed instead of opening a composer, that's the symptom —
  tell the user rather than retrying.
- **LinkedIn**: has no supported URL parameter for prefilling post *text* (only
  link-preview share URLs, which don't carry custom commentary). Navigate to
  `https://www.linkedin.com/feed/`, click "Start a post" to open the compose
  modal (lands on `https://www.linkedin.com/sharing/compose`). A plain coordinate
  click into the editor area does **not** reliably focus LinkedIn's rich-text
  box — use `find` to get a ref for the post-text textbox, click via that ref,
  then type. Confirmed working 2026-10-23.

## Stopping point

After each compose box is filled and visibly showing the drafted text in the
browser tab, stop and tell the user it's staged and ready. Do not click
Post/Share/Submit on any platform. If a tab fails to fill correctly, say so rather
than retrying blindly — these are live, user-facing social accounts.
