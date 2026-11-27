-- Executa no SQL Editor do Supabase
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'Projeto sem título',
  aspect text not null default '16/9',
  resolution integer not null default 1080,
  speed numeric not null default 1,
  volume numeric not null default 1,
  overlay text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
drop policy if exists "Users manage own projects" on public.projects;
create policy "Users manage own projects" on public.projects
 for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('luba-media','luba-media',false,1073741824,
 array['video/mp4','video/webm','video/quicktime','image/jpeg','image/png','image/webp','audio/mpeg','audio/wav'])
on conflict (id) do nothing;

drop policy if exists "User files are private" on storage.objects;
create policy "User files are private" on storage.objects
 for all to authenticated
 using (bucket_id='luba-media' and (storage.foldername(name))[1]=auth.uid()::text)
 with check (bucket_id='luba-media' and (storage.foldername(name))[1]=auth.uid()::text);
