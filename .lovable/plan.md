## Step 1 — Remove dead admin & CMS code (frontend, config, database, secrets)

The frontend already runs entirely off static `src/lib/podcastData.ts`. Everything below is unused leftover infrastructure from the old CMS.

### 1. Clean `supabase/config.toml`
Remove the two dead function blocks:
- `[functions.verify-admin-password]`
- `[functions.admin-data]`

(The actual function code folders are already gone.)

### 2. Database migration — drop unused CMS schema

Drop in dependency order:

**Tables (all unused by the app):**
- `episode_hosts`, `live_episode_hosts` (junction tables — drop first)
- `episodes`, `live_episodes`
- `hosts`, `speakers`
- `newsletter_mentions`
- `user_roles`

**Functions:**
- `public.is_admin()`
- `public.has_role(uuid, app_role)`

**Type:**
- `public.app_role` enum

**Keep untouched:**
- `subscribers` table — actively used by the subscribe form
- `update_updated_at_column()` function — generic utility, harmless
- `episode-images` storage bucket (decide separately later if you want it gone)

**`subscribers` policies after cleanup:**
- Keep: `Anyone can subscribe` (INSERT for anon + authenticated)
- Drop: `Admins can read subscribers` (you read via the View Backend / service role anyway)
- Net result: public can insert, nobody can read via the anon key — exactly what a subscribe form needs.

### 3. Delete the `ADMIN_PASSWORD` secret
No longer referenced anywhere.

### 4. Verify
- `rg -i "is_admin|has_role|user_roles|app_role|verify-admin-password|admin-data" src/` returns only auto-generated `types.ts` references (which will regenerate clean after the migration).
- Build succeeds, preview still loads, subscribe form still inserts.

### What we are NOT doing in this step
- Not touching `README`, dependency audit, `vercel.json`, GitHub, or Vercel — those are later steps.
- Not touching the `episode-images` storage bucket — ask about that separately if you want it removed.

### Technical notes
- Single migration with `DROP TABLE ... CASCADE` handles the admin RLS policies on the dropped tables automatically.
- Dropping `is_admin()` / `has_role()` is safe **only after** the `subscribers` admin policy and all other admin policies are dropped. The migration orders this correctly.
- `src/integrations/supabase/types.ts` regenerates automatically after the migration runs — do not hand-edit it.

After you approve this plan, I'll execute it and stop again before moving to Step 2 (README + dependency audit).
