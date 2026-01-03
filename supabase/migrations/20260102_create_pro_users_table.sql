-- Create table for manually granted Pro users
CREATE TABLE IF NOT EXISTS public.pro_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  granted_by TEXT,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.pro_users ENABLE ROW LEVEL SECURITY;

-- Users can read their own Pro status
CREATE POLICY "Users can view their own pro status"
  ON public.pro_users
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can check if they have Pro
CREATE POLICY "Anyone can check pro status"
  ON public.pro_users
  FOR SELECT
  USING (true);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pro_users_user_id ON public.pro_users(user_id);
CREATE INDEX IF NOT EXISTS idx_pro_users_email ON public.pro_users(email);
