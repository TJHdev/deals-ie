SELECT deals.id, image_url, deal_title, price, username, 
deal_link, deal_starts, deal_ends, 
deals.edited_at, deals.created_at, 
deal_expired, deal_text, currency_pound, 
(SELECT COUNT(*) FROM deal_likes WHERE deal_id=deals.id AND is_like=true) AS likes,
(SELECT COUNT(*) FROM deal_likes WHERE deal_id=deals.id AND is_like=false) AS dislikes,
(SELECT is_like FROM deal_likes WHERE deal_id=deals.id AND user_id=28) AS is_like
FROM deals
JOIN users ON users.id=deals.user_id