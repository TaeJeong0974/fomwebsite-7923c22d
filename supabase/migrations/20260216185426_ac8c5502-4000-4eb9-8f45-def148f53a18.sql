
-- Enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Convenience wrapper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS on user_roles: admins can manage, users can read own
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Users read own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Hosts table
CREATE TABLE public.hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hosts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hosts" ON public.hosts FOR SELECT USING (true);
CREATE POLICY "Admins insert hosts" ON public.hosts FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update hosts" ON public.hosts FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins delete hosts" ON public.hosts FOR DELETE TO authenticated USING (public.is_admin());

-- Episodes table
CREATE TABLE public.episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  episode_number INTEGER,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  guest_name TEXT,
  guest_title TEXT,
  guest_company TEXT,
  guest_bio TEXT,
  guest_image_url TEXT,
  guest_linkedin_url TEXT,
  poster_image_url TEXT,
  og_image_url TEXT,
  apple_url TEXT,
  spotify_url TEXT,
  youtube_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  publish_date DATE,
  topics JSONB DEFAULT '[]'::jsonb,
  pull_quote TEXT,
  pull_quote_attribution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published episodes" ON public.episodes FOR SELECT USING (published = true);
CREATE POLICY "Admins read all episodes" ON public.episodes FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins insert episodes" ON public.episodes FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update episodes" ON public.episodes FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins delete episodes" ON public.episodes FOR DELETE TO authenticated USING (public.is_admin());

-- Episode-Hosts junction
CREATE TABLE public.episode_hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id UUID REFERENCES public.episodes(id) ON DELETE CASCADE NOT NULL,
  host_id UUID REFERENCES public.hosts(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (episode_id, host_id)
);
ALTER TABLE public.episode_hosts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read episode_hosts" ON public.episode_hosts FOR SELECT USING (true);
CREATE POLICY "Admins insert episode_hosts" ON public.episode_hosts FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete episode_hosts" ON public.episode_hosts FOR DELETE TO authenticated USING (public.is_admin());

-- Newsletter mentions
CREATE TABLE public.newsletter_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id UUID REFERENCES public.episodes(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_mentions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read newsletters" ON public.newsletter_mentions FOR SELECT USING (true);
CREATE POLICY "Admins insert newsletters" ON public.newsletter_mentions FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update newsletters" ON public.newsletter_mentions FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins delete newsletters" ON public.newsletter_mentions FOR DELETE TO authenticated USING (public.is_admin());

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_hosts_updated_at BEFORE UPDATE ON public.hosts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_episodes_updated_at BEFORE UPDATE ON public.episodes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
