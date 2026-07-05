
create policy "Public read section files" on storage.objects for select using (bucket_id = 'section-files');
create policy "Admins upload section files" on storage.objects for insert to authenticated with check (bucket_id = 'section-files' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update section files" on storage.objects for update to authenticated using (bucket_id = 'section-files' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete section files" on storage.objects for delete to authenticated using (bucket_id = 'section-files' and public.has_role(auth.uid(), 'admin'));
