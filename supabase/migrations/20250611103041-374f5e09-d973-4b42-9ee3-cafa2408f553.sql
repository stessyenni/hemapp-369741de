
-- Add missing columns to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_image_url text,
ADD COLUMN IF NOT EXISTS phone_number text;

-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create storage bucket for profile images (only if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can upload their own profile images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile images" ON storage.objects;

-- Create storage policies for profile images
CREATE POLICY "Users can upload their own profile images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view profile images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-images');

CREATE POLICY "Users can update their own profile images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Enable RLS on existing tables for user-specific content
ALTER TABLE public.diet_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and recreate them for diet_entries
DROP POLICY IF EXISTS "Users can view their own diet entries" ON public.diet_entries;
DROP POLICY IF EXISTS "Users can insert their own diet entries" ON public.diet_entries;
DROP POLICY IF EXISTS "Users can update their own diet entries" ON public.diet_entries;
DROP POLICY IF EXISTS "Users can delete their own diet entries" ON public.diet_entries;

CREATE POLICY "Users can view their own diet entries"
  ON public.diet_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diet entries"
  ON public.diet_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diet entries"
  ON public.diet_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diet entries"
  ON public.diet_entries
  FOR DELETE
  USING (auth.uid() = user_id);

-- Drop existing policies and recreate them for health_goals
DROP POLICY IF EXISTS "Users can view their own health goals" ON public.health_goals;
DROP POLICY IF EXISTS "Users can insert their own health goals" ON public.health_goals;
DROP POLICY IF EXISTS "Users can update their own health goals" ON public.health_goals;
DROP POLICY IF EXISTS "Users can delete their own health goals" ON public.health_goals;

CREATE POLICY "Users can view their own health goals"
  ON public.health_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health goals"
  ON public.health_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health goals"
  ON public.health_goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health goals"
  ON public.health_goals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Drop existing policies and recreate them for chat_messages
DROP POLICY IF EXISTS "Users can view their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can update their own chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete their own chat messages" ON public.chat_messages;

CREATE POLICY "Users can view their own chat messages"
  ON public.chat_messages
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat messages"
  ON public.chat_messages
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chat messages"
  ON public.chat_messages
  FOR DELETE
  USING (auth.uid() = user_id);
