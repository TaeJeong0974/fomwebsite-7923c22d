
-- Add missing columns for detail page parity
ALTER TABLE public.episodes ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE public.episodes ADD COLUMN IF NOT EXISTS guest_company_domain text;
ALTER TABLE public.episodes ADD COLUMN IF NOT EXISTS full_description text;
ALTER TABLE public.episodes ADD COLUMN IF NOT EXISTS preview_video_url text;

-- Create newsletter_mentions table already exists, so skip

-- Note: 'description' in DB maps to 'overview' on detail page
-- 'full_description' is the long-form 'About this Episode' text
