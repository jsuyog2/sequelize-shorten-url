CREATE DATABASE shortenurl;

CREATE TABLE public.shorturls
(
  url_id serial,
  full_url character varying NOT NULL,
  short_url character varying NOT NULL,
  created_time timestamp with time zone NOT NULL,
  clicks numeric,
  CONSTRAINT shorturls_pkey PRIMARY KEY (url_id),
  CONSTRAINT shorturls_short_url_key UNIQUE (short_url)
)