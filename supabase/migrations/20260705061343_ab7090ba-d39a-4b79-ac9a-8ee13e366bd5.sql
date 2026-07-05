
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "Admins view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Auto-assign admin role for owner email on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'gauravvyas14891@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Also grant admin retroactively if that email already exists
insert into public.user_roles (user_id, role)
select id, 'admin'::app_role from auth.users where lower(email) = 'gauravvyas14891@gmail.com'
on conflict do nothing;

-- Site settings singleton
create table public.site_settings (
  id int primary key default 1,
  email text,
  linkedin_url text,
  github_url text,
  location text,
  updated_at timestamptz not null default now(),
  constraint singleton check (id = 1)
);
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to authenticated, service_role;
alter table public.site_settings enable row level security;
create policy "Public read settings" on public.site_settings for select using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

insert into public.site_settings (id, email, linkedin_url, github_url, location)
values (1, 'gauravvyas14891@gmail.com', 'https://www.linkedin.com/in/gourav-vyas-34b110224', 'https://github.com/GauravVyas14891', 'India')
on conflict (id) do update set
  email = excluded.email,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url,
  location = excluded.location;

-- Custom sections (Experience, Certifications, etc.)
create table public.custom_sections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  type text not null default 'timeline', -- timeline | cards | documents | richtext
  intro text,
  position int not null default 100,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.custom_sections to anon, authenticated;
grant all on public.custom_sections to authenticated, service_role;
alter table public.custom_sections enable row level security;
create policy "Public read sections" on public.custom_sections for select using (true);
create policy "Admins manage sections" on public.custom_sections for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Items belonging to sections
create table public.section_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.custom_sections(id) on delete cascade,
  title text not null,
  subtitle text,
  description text,
  period text,
  file_url text,
  file_name text,
  meta jsonb not null default '{}'::jsonb,
  position int not null default 100,
  created_at timestamptz not null default now()
);
grant select on public.section_items to anon, authenticated;
grant all on public.section_items to authenticated, service_role;
alter table public.section_items enable row level security;
create policy "Public read items" on public.section_items for select using (true);
create policy "Admins manage items" on public.section_items for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create index on public.section_items(section_id, position);
