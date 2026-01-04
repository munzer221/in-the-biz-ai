-- Bootstrap: Grant Pro access to the first admin user
-- This allows the initial admin to grant Pro access to other users
-- Replace with your actual user email/ID

-- Find your user ID and grant Pro access
-- You'll need to update this with your actual email address
DO $$
DECLARE
    admin_user_id UUID;
    admin_email TEXT;
BEGIN
    -- Get the first user (assuming that's you, the admin)
    SELECT id, email INTO admin_user_id, admin_email
    FROM auth.users
    ORDER BY created_at ASC
    LIMIT 1;
    
    -- Grant Pro access to this user
    INSERT INTO public.pro_users (user_id, email, granted_by, notes)
    VALUES (admin_user_id, admin_email, 'system', 'Initial admin user')
    ON CONFLICT (user_id) DO NOTHING;
    
    RAISE NOTICE 'Pro access granted to: %', admin_email;
END $$;
