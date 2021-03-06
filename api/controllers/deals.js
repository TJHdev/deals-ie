const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const format = require("date-fns/format");

cloudinary.config();

const handleDealSubmit = (db, Joi) => (req, res) => {
  const { authorization } = req.headers;
  const payload = jwt.decode(authorization);

  // console.log("JWT payload: ", payload);

  const user_id = payload.userId;
  if (!user_id) {
    return res.status(400).json("No userId in payload");
  }

  const schema = Joi.object().keys({
    deal_link: Joi.string().allow(""),
    currency_pound: Joi.bool(),
    price: Joi.number()
      .positive()
      .precision(2)
      .allow(""),
    next_best_price: Joi.number()
      .positive()
      .precision(2)
      .allow(""),
    image_url: Joi.string().allow(""),
    camel_url: Joi.string().allow(""),
    deal_starts: Joi.date(),
    deal_ends: Joi.date().allow(""),
    shipping_from: Joi.string().allow(""),
    offline_deal: Joi.bool().required(),
    deal_nsfw: Joi.bool().required(),
    deal_title: Joi.string()
      .required()
      .max(140),
    deal_text: Joi.string()
      .required()
      .max(1200)
  });

  Joi.validate(req.body, schema, { abortEarly: false }, function(err, value) {
    if (err) {
      res.status(400).json(err);
      return null;
    }

    const {
      deal_link,
      currency_pound,
      // price,
      // next_best_price,
      image_url,
      camel_url,
      // deal_starts,
      // deal_ends,
      shipping_from,
      offline_deal,
      deal_nsfw,
      deal_title,
      deal_text
    } = value;

    function formatDate(date) {
      if (date) {
        return format(date);
      } else {
        return null;
      }
    }

    const price = value.price ? value.price : null;
    const next_best_price = value.next_best_price
      ? value.next_best_price
      : null;

    const deal_starts = formatDate(value.deal_starts);
    const deal_ends = formatDate(value.deal_ends);

    db.insert({
      user_id: user_id,
      deal_link: deal_link,
      currency_pound: currency_pound,
      price: price,
      next_best_price: next_best_price,
      image_url: image_url,
      // camel_url: camel_url,
      deal_starts: deal_starts,
      deal_ends: deal_ends,
      // shipping_from: shipping_from,
      offline_deal: offline_deal,
      deal_nsfw: deal_nsfw,
      deal_title: deal_title,
      deal_text: deal_text
    })
      .into("deals")
      .returning("*")
      .then(data => {
        console.log(data);
        res.status(200).json(data[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  const uploadImage = () => {};
  // res.status(200).json(req.body);
};

const handleGetDeal = db => (req, res) => {
  const { authorization } = res.locals;
  const payload = jwt.decode(authorization);
  const user_id = payload ? payload.userId : null;

  const deal_id = req.params.dealId;

  const countLikesSubquery = db
    .count("*")
    .from("deal_likes")
    .where("deal_id", "=", deal_id)
    .andWhere("is_like", "=", true)
    .as("likes");

  const countDislikesSubquery = db
    .count("*")
    .from("deal_likes")
    .where("deal_id", "=", deal_id)
    .andWhere("is_like", "=", false)
    .as("dislikes");

  const isLikeSubquery = db
    .select("is_like")
    .from("deal_likes")
    .whereRaw("deal_id=deals.id")
    .andWhere("user_id", "=", user_id)
    .as("is_like");

  db.select(
    "deals.id",
    "image_url",
    "deal_title",
    "price",
    "next_best_price",
    "username",
    "deal_link",
    "deal_starts",
    "deal_ends",
    "deals.edited_at",
    "deals.created_at",
    "deal_expired",
    "deal_text",
    countLikesSubquery,
    countDislikesSubquery,
    isLikeSubquery,
    "currency_pound"
  )
    .from("deals")
    .innerJoin("users", "users.id", "=", "deals.user_id")
    .where("deals.id", "=", deal_id)
    .then(
      deal => {
        res.json(deal[0]);
      },
      err => {
        res.json(err);
      }
    );
};

const handleGetAllDeals = db => (req, res) => {
  // console.log(
  //   "******* Authpassed to handleGetDeal: ",
  //   res.locals.authorization
  // );
  const { authorization } = res.locals;
  const payload = jwt.decode(authorization);
  const user_id = payload ? payload.userId : null;

  const countLikesSubquery = db
    .count("*")
    .from("deal_likes")
    .whereRaw("deal_id=deals.id")
    .andWhere("is_like", "=", true)
    .as("likes");

  const countDislikesSubquery = db
    .count("*")
    .from("deal_likes")
    .whereRaw("deal_id=deals.id")
    .andWhere("is_like", "=", false)
    .as("dislikes");

  const isLikeSubquery = db
    .select("is_like")
    .from("deal_likes")
    .whereRaw("deal_id=deals.id")
    .andWhere("user_id", "=", user_id)
    .as("is_like");

  const pageNumber = req.query.page ? req.query.page - 1 : 0;
  const numberPerPage = 40;
  const offset = pageNumber * numberPerPage;

  const searchField = req.query.search
    ? decodeURIComponent(req.query.search.toLowerCase())
    : "";
  const sanitisedSearchField = searchField.replace(/[^\wèéòàùì\s]/gi, ""); // makes safe for raw SQL query

  console.log(
    "************** SANITISED SEARCH FIELD **************",
    sanitisedSearchField
  );

  db.select(
    "deals.id",
    "image_url",
    "deal_title",
    "price",
    "next_best_price",
    "username",
    "deal_link",
    "deal_starts",
    "deal_ends",
    "deals.edited_at",
    "deals.created_at",
    "deal_expired",
    "deal_text",
    countLikesSubquery,
    countDislikesSubquery,
    isLikeSubquery,
    "currency_pound"
  )
    .from("deals")
    .innerJoin("users", "users.id", "=", "deals.user_id")
    .where(db.raw("LOWER(deal_title) LIKE ?", `%${sanitisedSearchField}%`))
    .orWhere(db.raw("LOWER(deal_text) LIKE ?", `%${sanitisedSearchField}%`))
    .limit(numberPerPage)
    .offset(offset)
    .then(
      deals => {
        res.status(200).json(deals);
      },
      err => {
        res.status(400).json("Could not retrieve deals from the database");
      }
    );
};

module.exports = {
  handleDealSubmit,
  handleGetDeal,
  handleGetAllDeals
};
