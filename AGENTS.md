# Project Instructions

## Project identity

- This project is Yoon Sangwon's personal development blog and long-term learning archive.
- It records learning and experiments about UI development, web publishing, responsive web, accessibility, HTML, CSS, interface implementation, problem solving, and AI-assisted work.
- Do not turn the site into a resume, recruitment portfolio, career timeline, selected-work showcase, or lead-generation site.
- Do not invent employment history, projects, achievements, metrics, clients, employers, or personal facts.

## Source of truth

- Read `docs/site-spec.md` before planning or implementing site changes.
- Read the relevant research and specification documents under `docs/`.
- When documents conflict, use this order:
  1. The user's current explicit request
  2. `docs/site-spec.md`
  3. `docs/content-model.md`
  4. `docs/content-outline.md`
  5. `docs/design-reference.md`
  6. Research documents
- Do not silently broaden the product scope.

## Berkshire Hathaway reference

- Use the official Berkshire Hathaway homepage as a structural reference for direct, link-first, function-first information delivery.
- Apply its short identity block, link index, update dates, separators, operating note, disclaimer, and copyright pattern where appropriate.
- Do not imitate it only through retro colors, serif typography, or default browser styling.
- Do not copy Berkshire Hathaway trademarks, logos, company content, wording, address, advertising, or visual composition.
- Do not reproduce its table-based layout, mobile crowding, ambiguous links, old markup, or accessibility limitations.
- Implement responsive behavior and accessibility to modern standards.

## Content and interface

- Prioritize Writing, Notes, Lab, and Archive.
- Prioritize readability and findability over decoration.
- Use semantic HTML and native elements before ARIA or JavaScript.
- Keep headings, landmarks, lists, links, dates, and reading order meaningful.
- Use visible underlined links, visited states, and clear `:focus-visible` styles.
- Do not use card grids as the default information structure.
- Do not add shadows, gradients, badges, custom cursors, loading screens, parallax, decorative animation, or image-led hero sections without an explicit user request and demonstrated need.
- Do not use external webfonts.
- Do not use a hamburger menu or JavaScript navigation in the first version.
- Do not make the site look unfinished: maintain deliberate typography, spacing, alignment, separators, link states, and complete content labels.

## Technical constraints

- Use Astro as a thin build-time document generator.
- Use Markdown Content Collections and plain CSS.
- Minimize JavaScript and dependencies.
- Do not add React, Vue, Svelte, Tailwind, MDX, a CMS, View Transitions, a client router, analytics, search, comments, or a component library unless the user requests it and the need is verified.
- Reuse native platform features and existing project patterns before adding code or packages.
- Keep the generated site static and compatible with GitHub Pages.
- Preserve stable URLs, RSS, sitemap, canonical metadata, and draft exclusion.

## Responsive and accessibility requirements

- Work mobile-first.
- Prevent page-level horizontal scrolling.
- Support long titles, URLs, code, unbroken strings, and 200% text zoom.
- Avoid fixed heights and fragile absolute positioning.
- Keep touch targets and spacing usable.
- Provide a skip link and keyboard access to every function.
- Keep `:focus-visible` obvious and consistent.
- Use `time` for published and updated dates.
- Do not rely on color alone.
- Keep DOM reading order aligned with visual order.
- Test actual keyboard flow, not only automated accessibility scores.

## Change discipline

- Do not add features before confirming a real need.
- Do not perform a large redesign unless the user asks for one.
- Make the smallest change that satisfies the current specification.
- Do not edit unrelated files or rewrite working code for style alone.
- Preserve user changes and inspect the current state before editing.
- Mark unknown content as `draft`, `placeholder`, or `추후 작성`; never fabricate it.

## Verification

- After implementation changes, run the production build.
- Run the smallest relevant checks for the changed path.
- For interface changes, inspect responsive behavior and keyboard navigation.
- For content-model changes, verify draft exclusion, generated routes, Archive, RSS, sitemap, and metadata as applicable.
- Do not claim completion when required checks did not run; report the exact gap.

