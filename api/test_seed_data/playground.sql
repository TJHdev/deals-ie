SELECT image_url, deal_title, price, username, 
deal_link, deal_starts, deal_ends, 
deals.edited_at, deals.created_at, 
deal_expired, deal_text, currency_pound, 
(SELECT COUNT(*) FROM deal_likes WHERE deal_id=deals.id AND is_like=true) AS likes,
(SELECT COUNT(*) FROM deal_likes WHERE deal_id=deals.id AND is_like=false) AS dislikes,
is_like
FROM deals
JOIN users ON users.id=deals.user_id
LEFT JOIN deal_likes ON deals.id=deal_likes.deal_id