-- Add admin policy to allow viewing all profiles
-- This allows any Pro user to view all profiles (for admin panel functionality)

-- Drop the old restrictive policy first
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create new policy that allows:
-- 1. Users to view their own profile
-- 2. Pro users (admins) to view all profiles
CREATE POLICY "Users can view profiles" ON public.profiles
    FOR SELECT
    USING (
        auth.uid() = id  -- Users can always view their own profile
        OR
        -- Pro users (admins) can view all profiles
        EXISTS (
            SELECT 1 FROM public.pro_users
            WHERE pro_users.user_id = auth.uid()
        )
    );
