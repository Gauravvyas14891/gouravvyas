insert into public.user_roles (user_id, role)
select id, 'admin'::app_role from auth.users where lower(email) in ('gouravvyas14891@gmail.com','gauravvyas14891@gmail.com')
on conflict (user_id, role) do nothing;