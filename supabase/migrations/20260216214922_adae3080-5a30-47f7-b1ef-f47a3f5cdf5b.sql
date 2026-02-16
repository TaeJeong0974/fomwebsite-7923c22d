-- Fix episodes SELECT policies: change from restrictive to permissive
DROP POLICY IF EXISTS "Public read published episodes" ON public.episodes;
DROP POLICY IF EXISTS "Admins read all episodes" ON public.episodes;

CREATE POLICY "Public read all episodes"
ON public.episodes FOR SELECT
USING (true);

-- Fix hosts SELECT policy: change from restrictive to permissive
DROP POLICY IF EXISTS "Public read hosts" ON public.hosts;

CREATE POLICY "Public read hosts"
ON public.hosts FOR SELECT
USING (true);

-- Fix episode_hosts SELECT policy: change from restrictive to permissive
DROP POLICY IF EXISTS "Public read episode_hosts" ON public.episode_hosts;

CREATE POLICY "Public read episode_hosts"
ON public.episode_hosts FOR SELECT
USING (true);

-- Fix newsletter_mentions SELECT policy: change from restrictive to permissive
DROP POLICY IF EXISTS "Public read newsletters" ON public.newsletter_mentions;

CREATE POLICY "Public read newsletters"
ON public.newsletter_mentions FOR SELECT
USING (true);