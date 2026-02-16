
-- Live episodes table (mirrors staging episodes)
CREATE TABLE public.live_episodes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staging_id uuid NOT NULL REFERENCES public.episodes(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  subtitle text,
  episode_number integer,
  description text,
  full_description text,
  duration text,
  guest_name text,
  guest_title text,
  guest_company text,
  guest_company_domain text,
  guest_bio text,
  guest_image_url text,
  guest_linkedin_url text,
  poster_image_url text,
  og_image_url text,
  preview_video_url text,
  apple_url text,
  spotify_url text,
  youtube_url text,
  publish_date date,
  status text NOT NULL DEFAULT 'published',
  topics jsonb DEFAULT '[]'::jsonb,
  pull_quote text,
  pull_quote_attribution text,
  promoted_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(staging_id)
);

-- Live episode-host mappings
CREATE TABLE public.live_episode_hosts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  live_episode_id uuid NOT NULL REFERENCES public.live_episodes(id) ON DELETE CASCADE,
  host_id uuid NOT NULL REFERENCES public.hosts(id) ON DELETE CASCADE
);

-- Public read for live tables
ALTER TABLE public.live_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_episode_hosts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read live_episodes" ON public.live_episodes FOR SELECT USING (true);
CREATE POLICY "Public read live_episode_hosts" ON public.live_episode_hosts FOR SELECT USING (true);

CREATE POLICY "Admins manage live_episodes" ON public.live_episodes FOR ALL USING (is_admin());
CREATE POLICY "Admins manage live_episode_hosts" ON public.live_episode_hosts FOR ALL USING (is_admin());

-- Track when an episode was last promoted
ALTER TABLE public.episodes ADD COLUMN promoted_at timestamp with time zone;
