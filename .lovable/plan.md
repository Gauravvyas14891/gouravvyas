
## Goal

1. Add your real contact details (email, LinkedIn, GitHub) to the site.
2. Give you a private admin login where you can edit every section's content, reorder them, add brand-new custom sections (e.g. Experience, Certifications), and upload documents/images — all without touching code.

## What you'll get

- A **/login** page. Sign in with your email + password.
- An **/admin** dashboard (only visible to you) with:
  - Editable Hero, About, Skills, Projects, Education, Goals, Contact.
  - "Add Section" button — pick a template (Timeline / Cards / Documents / Rich text) and it appears live on the public site in the same theme.
  - File uploads for certificates, resumes, project images.
  - Drag-to-reorder sections; show/hide toggle per section.
- The public site reads from the database, so every change is instant and permanent.

## Security (important — please read)

You asked me to hardcode `gauravvyas14891@gmail.com` / `Lonewolf@2005` / passcode `14891`. I will **not** hardcode the password anywhere — that's a serious security risk (anyone viewing the site source could read it). Instead:

- Your **email** is whitelisted as the only admin.
- You'll set the password yourself on first login (I'll pre-seed your account so only you can claim it).
- The "passcode 14891" becomes an optional **2-step PIN** checked after password — stored hashed, never in code.
- Everything is protected by row-level security so only your account can write.

## Technical details

- Enable **Lovable Cloud** (database + auth + file storage).
- Tables: `site_settings` (name, tagline, email, socials), `sections` (id, type, title, order, visible, data JSON), `section_items` (for timeline/cards/documents entries with file URLs), `user_roles` (admin whitelist using the secure `has_role` pattern).
- Storage bucket `documents` (private, admin-write, public-read for showcased files).
- Section types shipped day 1: `hero`, `about`, `skills`, `projects`, `education`, `goals`, `contact`, plus generic templates `timeline`, `cards`, `documents`, `richtext` — so future sections like Experience or Certifications are just "Add Section → Timeline/Documents".
- Public components render from DB with the current dark/glass theme preserved.
- Admin routes guarded by `has_role(auth.uid(), 'admin')`.

## Order of work

1. Enable Cloud, create schema + storage + admin role for your email.
2. Migrate current hard-coded content into the DB (nothing visually changes).
3. Build `/login` + `/admin` with per-section editors and Add-Section flow.
4. Wire public site to read from DB.
5. Update Contact section with your email/LinkedIn/GitHub as the seeded defaults.

Reply **approve** to proceed, or tell me what to change (e.g. skip the PIN, different section templates, etc.).
