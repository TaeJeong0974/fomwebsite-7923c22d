-- Create storage bucket for episode images
INSERT INTO storage.buckets (id, name, public)
VALUES ('episode-images', 'episode-images', true);

-- Allow public read access
CREATE POLICY "Public read episode images"
ON storage.objects FOR SELECT
USING (bucket_id = 'episode-images');

-- Allow authenticated admins to upload
CREATE POLICY "Admins upload episode images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'episode-images');

-- Allow authenticated admins to update
CREATE POLICY "Admins update episode images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'episode-images');

-- Allow authenticated admins to delete
CREATE POLICY "Admins delete episode images"
ON storage.objects FOR DELETE
USING (bucket_id = 'episode-images');