-- Add admin policies for pro_users table
-- Allow Pro users (admins) to manage other users' Pro access

-- Allow Pro users to insert new Pro users
CREATE POLICY "Pro users can grant pro access" ON public.pro_users
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pro_users
            WHERE user_id = auth.uid()
        )
    );

-- Allow Pro users to update Pro user records
CREATE POLICY "Pro users can update pro access" ON public.pro_users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.pro_users
            WHERE user_id = auth.uid()
        )
    );

-- Allow Pro users to delete Pro user records (revoke access)
CREATE POLICY "Pro users can revoke pro access" ON public.pro_users
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.pro_users
            WHERE user_id = auth.uid()
        )
    );
