
-- Create speakers table (guests/external speakers)
CREATE TABLE public.speakers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  company_domain TEXT,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read speakers" ON public.speakers FOR SELECT USING (true);

-- Admin write
CREATE POLICY "Admins insert speakers" ON public.speakers FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins update speakers" ON public.speakers FOR UPDATE USING (is_admin());
CREATE POLICY "Admins delete speakers" ON public.speakers FOR DELETE USING (is_admin());

-- Auto-update timestamp
CREATE TRIGGER update_speakers_updated_at
  BEFORE UPDATE ON public.speakers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
