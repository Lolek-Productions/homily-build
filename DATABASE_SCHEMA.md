-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.homilies (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text NOT NULL,
  description text,
  definitions text,
  first_set_of_questions text,
  second_set_of_questions text,
  final_draft text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  status text,
  readings text,
  CONSTRAINT homilies_pkey PRIMARY KEY (id),
  CONSTRAINT homilies_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  definitions text NOT NULL,
  CONSTRAINT user_settings_pkey PRIMARY KEY (id),
  CONSTRAINT user_settings_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);