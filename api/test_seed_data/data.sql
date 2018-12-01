INSERT INTO login(hash, email)
VALUES
('$2a$10$aT8690Bbmu.qctEqzK6CQ.OXoJRTvKKrvKI4OSJQb7NbE9ZFhMyZS', 'drdraconian@hotmail.com'),
('$2a$10$4WP2TWpNLqodLwvJsf1dGu/stJ30o8KqpqUgR9xaRo.1bRmqwvQ.u', 'tegative@hotmail.com'),
('$2a$10$Lc2rfxF.eiUgO55kwx4Apex0OYw4cixDF7fnVYZSkRiKtQruxl8xK', 'skyesuperjet@hotmail.com'),
('$2a$10$q7N4i44lKjANBj.mv5neceIX83/gizzUyfLyUs0Dxe3VYEfpO/kgK', 'beatdubbish@hotmail.com'),
('$2a$10$gEb4maPkRye1ZL7XrjSDO.1Q6WfxrKaZpu4an5dAKwAh3wAR0CUmi', 'poetaldebaran@hotmail.com'),
('$2a$10$Zp9oqfmcxUK1KYRTit73UOkl/bokpMvzsu7qKuPD2ZZ/h3Bpn2Xk.', 'disappointedmiss@hotmail.com'),
('$2a$10$PQ0vHU0/ojdV5fwZpEKIIuqr/dOSlAIoecszWXhV35EOwmRRWdOdy', 'contentsvexing@hotmail.com'),
('$2a$10$RIeFn.nntcB8oPO.xTseDe3qduYBKxTTR45.FWPYf3Dl07QDNlHvO', 'vocalaladdin@hotmail.com'),
('$2a$10$QNpU.68MR0dFsIwFhjphTekg..bADFA1Qq2rVHGvue0IhKRSyK6s.', 'moonbeamhats@hotmail.com'),
('$2a$10$.nsnPMK021fDGdBAeu1LnOXgq1bwDTG4.XSrd6YgXjZeDCazz.qIy', 'popularanonymous@hotmail.com')


INSERT INTO users(username, email, admin)
VALUES
('drdraconian', 'drdraconian@hotmail.com', true), -- testpassword1!
('tegative', 'tegative@hotmail.com', false),
('skyesuperjet', 'skyesuperjet@hotmail.com', false),
('beatdubbish', 'beatdubbish@hotmail.com', false),
('poetaldebaran', 'poetaldebaran@hotmail.com', false),
('disappointedmiss', 'disappointedmiss@hotmail.com', false),
('contentsvexing', 'contentsvexing@hotmail.com', false),
('vocalaladdin', 'vocalaladdin@hotmail.com', false),
('moonbeamhats', 'moonbeamhats@hotmail.com', false),
('popularanonymous', 'popularanonymous@hotmail.com', false)

INSERT INTO deals(user_id, deal_link, currency_pound, price, next_best_price, image_url, offline_deal, shipping_from, deal_nsfw, deal_title, deal_text)
VALUES
('28',
'https://store.playstation.com/en-gb/product/EP0006-CUSA04013_00-TITANFALL2RSPWN1',
true,
'3.99',
'6.49',
'https://store.playstation.com/store/api/chihiro/00_09_000/container/GB/en/999/EP0006-CUSA04013_00-TITANFALL2RSPWN1/1543572042000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
false,
'Digital',
false,
'Titanfall 2 PS4 £3.99 @ PSN Store',
'Titanfall 2 ps4 @psn store

£3.99

Save 86 %'
),

('28',
'https://www.aldi.co.uk/heavy-duty-platform-truck/p/085045228031400',
true,
'14.99',
'34.99',
'https://cdn.aldi-digital.co.uk/085045228031400-A.jpg?o=v%24nP1HhqTiUSsgDNp5mmBTn7X5gj&V=fSlO&w=1500&p=2&q=50',
false,
'UK',
false,
'Heavy duty platform truck £14.99 / £17.94 delivered @ Aldi',
'Aldi have their heavy duty platform truck on offer online reduced from £34.99 to £14.99. 

Max load 300kgs. Folds for easy storage. 

Free delivery on orders over £20. Great for moving washing machines etc'
),

('28',
'https://www.argos.co.uk/product/4759577',
true,
'15.99',
'21.87',
'https://media.4rgos.it/i/Argos/4759577_R_Z001A?$Web$&$DefaultPDP1536$',
false,
'UK',
false,
'Davidoff Adventure Eau de Toilette for Men (100ml) - was £24.99 now £15.99 @ Argos',
'Davidoff Adventure is vibrant and captivating, Davidoff Adventure explores uncharted fragrance territory. The fragrance from Davidoff has a fresh spicy woody composition and is daring and elemental, inspired by the world''s greatest wildernesses and raw, masculine emotion
Created by Design House Davidoff for men
Masculine scent is classified as woody oriental with a fresh spicy woody composition
Recommended for casual wear
Gift for all occasions
100 ml bottle'
),

('28',
'https://www.hughes.co.uk/product/audio/hifi-and-speakers/multiroom-audio/onkyo/vcgx30w',
true,
'49.99',
'199.99',
'https://cdn.hughes.co.uk/live/media/image/d0/6e/d7/onk-vcgx30wcL674bK4CfERyN_600x600.jpg',
false,
'UK',
false,
'Onkyo G3 Smart Speaker with Google Assistance - £49.99 @ Hughes',
'PRODUCT DETAILS
Onkyo G3 Smart Speaker with Google Assistance - White Introducing your voice-controlled lifestyle concierge with the Google Assistant built-in and enhanced by decades of Onkyo audio know-how to give music wings. Ask to play whatever you want through custom amp and long-throw woofer, or voice-control other speakers in a Chromecast built-in ecosystem when your hands are full. Experience the depth and power only Onkyo can bring to music.'
),

('37',
'https://www.superdrug.com/Fragrance/Fragrance-For-Him/Men''s-Aftershave/Boss-The-Scent-Him-Intense-Eau-De-Parfum-200ml/p/765627',
true,
'50.00',
'199.99',
'https://www.superdrug.com/medias/sys_master/front-zoom/front-zoom/h70/hef/9676147818526/BOSS-THE-SCENT-HIM-INTENSE-200-EDP-765627.jpg',
false,
'UK',
false,
'Boss The Scent Him Intense Eau De Parfum 200ml- 2 for £75 @ Superdrug',
'This EDP was very hot deal few weeks ago at £50 per 200ml. Now Superdrug are doing BOGOHP you can get two for £75...that is £37.50 per bottle which is crazy. Also potential cashback from TCB or Quidco'
), 

-- first 5

('37', -- userid
'https://www.idmobile.co.uk/shop/pay-monthly/huawei-p20-pro', -- deal_link
true, -- currency_pound
'561.75', -- price
'650.00', -- next_bext_price
'https://media.secure-mobiles.com/product-images/Huawei-P20-Pro-Twilight.idm_main_product1.centre.png', --image_url
false, -- offline_deal
'UK', --shipping_from
false, -- deal_nsfw
'Huawei P20 Pro 500 minutes Unltd texts 500MB data £22.99 per month x 24 months = £571.75 £9.99 upfront @ ID mobile + Other tariffs', -- deal_title
'Nice little deal on a Huawei P20 Pro via iD Mobile. 500 minutes, unlimited texts and 500mB of data for £22.99 per month on a 24 month contract, with an upfront cost of just £19.99.

you get and the sim, £571.75 total cost seems very reasonable. If you want extra data, you can get 1GB with 500 minutes for £23.99 a month' -- deal_text
), 

('36', -- userid
'https://www.ebuyer.com/780067-zotac-geforce-gtx-1070-mini-8gb-graphics-card-zt-p10700g-10m', -- deal_link
true, -- currency_pound
'299.99', -- price
'399.98', -- next_bext_price
'https://img.ebyrcdn.net/827603-780067-800.jpg', --image_url
false, -- offline_deal
'UK', --shipping_from
false, -- deal_nsfw
'Zotac GeForce GTX 1070 Mini 8GB Graphics Card + fortnite promotion Key + Free Monster Hunter World £297.49 @ Ebuyer', -- deal_title
'1.5 % cashback 

GTX 1070 Mini
8GB GDDR5
1708MHz Boost
5 Years Extended Waranty*

GPU GeForce® GTX 1070
CUDA cores 1920
Video Memory 8GB GDDR5
Memory Bus 256-bit
Engine Clock
Base: 1518 MHz 
Boost:1708 MHz
Memory Clock 8 GHz
PCI Express 3.0
Display Outputs
3 x DisplayPort 1.4 
HDMI 2.0b 
DL-DVI
HDCP Support Yes
Multi Display Capability Quad Display
Recommended Power Supply 500W
Power Consumption 150W
Power Input 8-pin
DirectX 12 API feature level 12_1
OpenGL 4.5
Cooling Twin Fan
Slot Size Dual Slot
SLI Yes, SLI HB Bridge Supported
Supported OS Windows 10 / 8 / 7
Card Length 210mm x 122mm
Accessories
Dual 6-pin to 8-pin PCIe adapter 
Driver Disk 
User Manual' -- deal_text
), 

('36', -- userid
'https://www.currys.co.uk/gbuk/smart-tech/smart-tech/smart-watches-and-fitness/fitness-trackers/fitbit-charge-2-teal-large-10151707-pdt.html', -- deal_link
true, -- currency_pound
'69.99', -- price
'109.98', -- next_bext_price
'https://brain-images-ssl.cdn.dixons.com/7/0/10151707/u_10151707.jpg', --image_url
false, -- offline_deal
'UK', --shipping_from
false, -- deal_nsfw
'FITBIT Charge 2 - Teal, Large - £69.99 with 2 year Guarantee Delivered @ Currys', -- deal_title
'Top features: 

- PurePulse heart rate monitor gives you more information so you always get the most from your workout 

- Multi-sport tracking makes it easy to monitor running, gym sessions, yoga, and more 

- Connected GPS provides real-time run stats 

- Smartphone alerts deliver incoming calls, texts, and calendar alerts 

- Guided breathing sessions for moments of calm' -- deal_text
), 

('36', -- userid
'https://www.johnlewis.com/lg-60uk6200pla-led-hdr-4k-ultra-hd-smart-tv-60-inch-with-freeview-play-freesat-hd-ultra-hd-certified-black/p3803486', -- deal_link
true, -- currency_pound
'549.95', -- price
'649.95', -- next_bext_price
'https://www.lg.com/uk/images/tvs/MD06035256/gallery/medium01.jpg', --image_url
false, -- offline_deal
'UK', --shipping_from
false, -- deal_nsfw
'LG 60UK6200PLA LED HDR 4K Ultra HD Smart TV - £549.95 @ John Lewis & Partners', -- deal_title
'Seems like a good price for a 60" - Spotted in store and seen online also - Maybe the TV buffs can offer feedback but it seems decent.' -- deal_text
), 

('37', -- userid
'https://www.screwfix.com/p/flomasta-flat-towel-radiator-chrome-700-x-600mm-242w-825btu/7188d', -- deal_link
true, -- currency_pound
'9.99', -- price
'14.99', -- next_bext_price
'https://media.screwfix.com/is/image//ae235?src=ae235/7188D_P&$prodImageMedium$', --image_url
false, -- offline_deal
'UK', --shipping_from
false, -- deal_nsfw
'Towel radiator / warmer sale - prices from £7.99 for 500mm x 550mm & £12.99 for 1500 x 600mm @ Screwfix', -- deal_title
'Just found these at Screwfix. Looks like they are having a sale on towel radiators and quite a few available for delivery and plenty of stock around for click and collect.

Get deal takes you to all towel radiators and includes the fixings you will need too which you will have to add on depending on your set up. 
Small and large ones available - the OH fitted one earlier this year and its so nice to have a warm fluffy towel to get out of the shower to on these cold dark mornings and also ideal for drying the kids socks too!' -- deal_text
);




-- first 10

-- ('37', -- userid
-- '', -- deal_link
-- true, -- currency_pound
-- '', -- price
-- '', -- next_bext_price
-- '', --image_url
-- false, -- offline_deal
-- 'UK', --shipping_from
-- false, -- deal_nsfw
-- '', -- deal_title
-- '' -- deal_text
-- ), 

-- **************** --
-- DEAL_LIKES TABLE
-- **************** --