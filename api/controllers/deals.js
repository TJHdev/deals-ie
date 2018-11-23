const cloudinary = require("cloudinary");

cloudinary.config();

const handleDealSubmit = (db, Joi) => (req, res) => {
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
      price,
      next_best_price,
      image_url,
      camel_url,
      deal_starts,
      deal_ends,
      shipping_from,
      offline_deal,
      deal_nsfw,
      deal_title,
      deal_text
    } = value;

    db.insert({
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
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

  const uploadImage = () => {};
  // res.status(200).json(req.body);
};

module.exports = {
  handleDealSubmit
};
