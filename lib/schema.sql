-- Mansa Database Schema

create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique,
  name text,
  email text,
  mansa_balance integer default 0,
  referral_code text unique,
  referred_by uuid references users(id),
  cuisine_preferences text[],
  created_at timestamp default now()
);

create table restaurants (
  id uuid primary key default gen_random_uuid(),
  name text,
  cuisine_type text,
  heritage_statement text,
  address text,
  lat float,
  lng float,
  verification_status text default 'listed',
  ownership_badge text,
  qr_code text unique,
  monthly_plan text default 'free',
  is_demo boolean default false,
  created_at timestamp default now()
);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  restaurant_id uuid references restaurants(id),
  type text,
  mansas integer,
  spend_amount float,
  created_at timestamp default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  name text,
  description text,
  event_date timestamp,
  location text,
  organiser text,
  is_featured boolean default false,
  created_at timestamp default now()
);

-- Indexes for performance
create index idx_users_clerk_id on users(clerk_id);
create index idx_users_referral_code on users(referral_code);
create index idx_restaurants_cuisine_type on restaurants(cuisine_type);
create index idx_restaurants_verification_status on restaurants(verification_status);
create index idx_transactions_user_id on transactions(user_id);
create index idx_transactions_restaurant_id on transactions(restaurant_id);
create index idx_transactions_created_at on transactions(created_at);
create index idx_events_event_date on events(event_date);
