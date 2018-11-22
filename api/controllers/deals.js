const cloudinary = require("cloudinary");

cloudinary.config();

const handleDealSubmit = (db, Joi) => (req, res) => {
  const schema = Joi.object().keys({
    deal_link: Joi.string(),
    price: Joi.number().positive(),
    next_best_price: Joi.number().positive(),
    image_url: Joi.string(),
    camel_url: Joi.string(),
    deal_starts: Joi.date().default(() => new Date()),
    deal_ends: Joi.date(),
    shipping_from: Joi.string(),
    offline_deal: Joi.bool().required(),
    deal_NSFW: Joi.bool().required(),
    deal_title: Joi.string()
      .required()
      .max(140),
    deal_text: Joi.string()
      .required()
      .max(1000)
  });

  // validationSchema={yup.object().shape({
  //   deal_link: yup.string(),
  //   price: yup.number().positive(),
  //   next_best_price: yup.number().positive(),
  //   image_url: yup.string(),
  //   camel_url: yup.string(),
  //   deal_starts: yup.date().default(() => new Date()),
  //   deal_ends: yup.date(),
  //   shipping_from: yup.string(),
  //   offline_deal: yup.bool().required(),
  //   deal_NSFW: yup.bool().required(),
  //   deal_title: yup
  //     .string()
  //     .required()
  //     .max(140),
  //   deal_text: yup
  //     .string()
  //     .required()
  //     .max(1000)
  // })}

  const {
    deal_link,
    price,
    next_best_price,
    image_url,
    camel_url,
    deal_starts,
    deal_ends,
    shipping_from,
    offline_deal,
    deal_NSFW,
    deal_title,
    deal_text
  } = req.body;

  console.log(req.body);

  const uploadImage = () => {};
  res.status(200).json(req.body);
};

module.exports = {
  handleDealSubmit
};
