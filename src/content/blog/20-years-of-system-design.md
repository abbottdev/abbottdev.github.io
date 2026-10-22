---
title: '20 years of system design: what changed when AI arrived'
description: 'What still holds, what broke, and what I now design for when part of the system is probabilistic.'
pubDate: 2026-11-01
tags: ['architecture', 'ai']
draft: true
---

<!--
Draft outline. This post is hidden from the live site until `draft: true` is removed.
Aim for 1,200 to 1,800 words, with at least one diagram and one concrete story from your own work.
-->

## What hasn't changed

- Boundaries, contracts and failure modes still decide whether a system survives.
- A story from early in your career that still applies.

## What changed

- One component is now probabilistic: the same input can give different outputs.
- Testing moves from asserting exact answers to measuring quality over a dataset.
- Cost and latency become per-request design decisions.

## What I design for now

1. Evaluation from day one, before the first prompt is tuned.
2. Oversight and audit trails as part of the architecture, not an afterthought.
3. Fallbacks: what happens when the model is wrong, slow or unavailable.

## Closing

One opinion you'd defend in a design review, and a question for readers.
