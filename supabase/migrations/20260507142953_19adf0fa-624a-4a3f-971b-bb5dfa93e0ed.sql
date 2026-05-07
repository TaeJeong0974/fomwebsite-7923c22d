-- Drop admin read policy on subscribers (frontend never reads; owner uses service role)
DROP POLICY IF EXISTS "Admins can read subscribers" ON public.subscribers;

-- Drop unused CMS tables (CASCADE removes their RLS policies that reference is_admin())
DROP TABLE IF EXISTS public.episode_hosts CASCADE;
DROP TABLE IF EXISTS public.live_episode_hosts CASCADE;
DROP TABLE IF EXISTS public.episodes CASCADE;
DROP TABLE IF EXISTS public.live_episodes CASCADE;
DROP TABLE IF EXISTS public.hosts CASCADE;
DROP TABLE IF EXISTS public.speakers CASCADE;
DROP TABLE IF EXISTS public.newsletter_mentions CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop role helper functions
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role) CASCADE;

-- Drop the role enum (now unreferenced)
DROP TYPE IF EXISTS public.app_role;