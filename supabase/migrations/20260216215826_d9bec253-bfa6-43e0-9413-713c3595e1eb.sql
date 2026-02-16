
-- Add status column with four states
ALTER TABLE public.episodes 
ADD COLUMN status text NOT NULL DEFAULT 'draft' 
CHECK (status IN ('published', 'upcoming', 'draft', 'deleted'));

-- Migrate existing data from published boolean
UPDATE public.episodes SET status = 'published' WHERE published = true;
UPDATE public.episodes SET status = 'upcoming' WHERE published = false;
