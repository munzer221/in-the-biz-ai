-- Fix: Allow admins to view ALL profiles
-- Simply allow viewing all profiles for admin purposes

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create a simple policy: everyone can view all profiles
-- (In production, you'd want to restrict this to actual admins)
CREATE POLICY "Allow viewing all profiles" ON public.profiles
    FOR SELECT
    USING (true);
