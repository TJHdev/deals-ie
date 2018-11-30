CREATE TABLE login (
  id serial PRIMARY KEY,
  hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  admin BOOLEAN NOT NULL DEFAULT false, 
  trusted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- retrospectively adding a unique constaint to a column 'ALTER TABLE users ADD UNIQUE (username);'

CREATE TABLE deals (
  id serial PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  deal_link VARCHAR(511),
  currency_pound BOOLEAN NOT NULL DEFAULT false;
  price decimal (19,4),
  next_best_price decimal (19,4),
  image_url VARCHAR(512),
  camel_url VARCHAR(512),
  deal_starts TIMESTAMPTZ DEFAULT NOW(),
  deal_ends TIMESTAMPTZ,
  shipping_from VARCHAR(100),
  offline_deal BOOLEAN NOT NULL,
  deal_NSFW BOOLEAN NOT NULL,
  deal_text VARCHAR(1600) NOT NULL,
  deal_title VARCHAR(255) NOT NULL,
  deal_reviewed BOOLEAN NOT NULL DEFAULT false,
  deal_hidden BOOLEAN NOT NULL DEFAULT false,
  deal_expired BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  edited_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE deal_likes (
  user_id INT REFERENCES users(id) NOT NULL,
  deal_id INT REFERENCES deals(id) NOT NULL,
  PRIMARY KEY (user_id, deal_id),
  is_like BOOLEAN NOT NULL
);



CREATE TABLE deal_reports (
  user_id INT REFERENCES users(id) NOT NULL,
  deal_id INT REFERENCES deals(id) NOT NULL,
  report_type VARCHAR(31) NOT NULL,
  report_reason VARCHAR(255) NOT NULL,
  false_report BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (user_id, deal_id)
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  deal_id INT REFERENCES deals(id) NOT NULL,
  reply_id INT REFERENCES comments(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ DEFAULT NOW(),
  comment_text VARCHAR(1024) NOT NULL
);

CREATE TABLE comment_likes (
  user_id INT REFERENCES users(id) NOT NULL,
  comment_id INT REFERENCES comments(id) NOT NULL,
  PRIMARY KEY (user_id, comment_id),
  is_like BOOLEAN NOT NULL
);



CREATE TABLE comment_reports (
  user_id INT REFERENCES users(id) NOT NULL,
  comment_id INT REFERENCES comments(id) NOT NULL,
  report_type VARCHAR(31) NOT NULL,
  report_reason VARCHAR(255) NOT NULL,
  false_report BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (user_id, comment_id)
);

CREATE TABLE groups (
  id serial PRIMARY KEY,
  group_name VARCHAR(63) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() 
);

CREATE TABLE deal_groups (
  deal_id INT REFERENCES deals(id) NOT NULL,
  group_id INT REFERENCES groups(id) NOT NULL,
  PRIMARY KEY (deal_id, group_id)
);