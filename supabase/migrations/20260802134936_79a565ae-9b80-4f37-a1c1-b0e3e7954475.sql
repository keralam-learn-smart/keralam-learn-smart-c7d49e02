REVOKE EXECUTE ON FUNCTION public.has_paid_access(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_paid_access(uuid) TO service_role;