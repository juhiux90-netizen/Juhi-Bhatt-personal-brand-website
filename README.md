# Juhi Bhatt — Personal Brand, Version 2.0

This is a self-contained, static website: HTML, CSS and a small amount of
vanilla JavaScript. No build step, no framework, no server required.

## Files

- `index.html` — all page content and structure
- `styles.css` — the full design system (colours, type, layout, responsive rules)
- `script.js` — scroll reveals, sticky nav, mobile menu, the "Selected Work" accordion
- `resume-juhi-bhatt.pdf` — a one-page, ATS-friendly resume generated from the same
  verified content as the site (linked from the "Download Resume" buttons)
- `build_resume.py` — the script that generated the resume PDF, in case you want to
  edit the resume content later and regenerate it (`python3 build_resume.py`,
  requires `pip install reportlab`)
- `favicon.svg`, `og-image.png` — browser tab icon and the image shown when the
  site is shared on social media / in link previews
- `robots.txt` — allows search engines to index the site

## One placeholder to know about

In the "Selected Work" section, the last entry ("Coordinating a hub of people
and programs") covers your current Podar role. Since you haven't shared specific
metrics for this first year yet, its "Outcome" field is intentionally left as an
honest placeholder rather than an invented number. Search `index.html` for:

```
Ongoing — specific outcomes and metrics to be added as this first year is reviewed.
```

Replace that line whenever you have concrete results to share (e.g. "coordinated
onboarding for X new team members" or "reduced stakeholder response time by Y%").

## Publishing it

Any static host works. Two of the simplest, free options:

**Netlify (drag and drop)**
1. Go to app.netlify.com/drop
2. Drag this whole folder into the browser window
3. You'll get a live URL immediately; you can add a custom domain from there

**GitHub Pages**
1. Create a new GitHub repository and upload these files to it
2. In the repo's Settings → Pages, set the source to the `main` branch, root folder
3. GitHub will publish it at `https://<your-username>.github.io/<repo-name>/`

Before you publish, you may want to update `<link rel="canonical">` and the
`og:url` / `twitter:url` meta tags in `index.html` to your real domain once you
have one — they currently point to a placeholder `https://juhibhatt.com/`.

## Editing content later

Everything is plain HTML — open `index.html` in any text editor and search for
the text you want to change. Section landmarks are commented, e.g.
`<!-- ============ HERO ============ -->`, to make sections easy to find.
