-- Why This Schema Design?
-- random unique ids for global unique identification for each note.
-- user_id links each note to an authenticated user from Supabase Auth, enforcing ownership.
-- title is essential for any note, so it’s made NOT NULL to prevent incomplete records.
-- content is optional to allow users to save quick notes that might only have a title.
-- category to allow the user to organise notes better.
-- bg color would help in the ui

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  category text,
  bg_color text default '#FFFFFF',
  created_at timestamp with time zone default timezone('utc'::text, now())
);