const jwt = require("jsonwebtoken");

const handleDealLikeGet = db => (req, res) => {
  const { authorization } = req.headers;
  const payload = jwt.decode(authorization);
  const deal_id = req.params.dealId;

  const user_id = payload.userId;
  if (!user_id) {
    return res.status(400).json("No userId in payload");
  }

  db.select("deal_id", "is_like")
    .from("deal_likes")
    .where("user_id", "=", user_id)
    .andWhere("deal_id", "=", deal_id)
    .then(
      like => {
        if (like[0]) {
          res.status(200).json(like[0]);
        } else {
          res
            .status(400)
            .json(
              "There is no current like for this user_id and deal_id combination"
            );
        }
      },
      err => {
        res.json("Could not retrieve the like from the db");
      }
    );
};

const handleDealLikeSubmit = db => (req, res) => {
  const { authorization } = req.headers;
  const deal_id = req.params.dealId;
  const { is_like } = req.body;
  console.log(req.body);

  const payload = jwt.decode(authorization);

  const user_id = payload.userId;
  if (!user_id) {
    return res.status(400).json("No userId in payload");
  }

  db.select("deal_id", "is_like")
    .from("deal_likes")
    .where("user_id", "=", user_id)
    .andWhere("deal_id", "=", deal_id)
    .then(
      like => {
        console.log("**** like: ", like);
        if (!like[0]) {
          db.insert({
            user_id: user_id,
            deal_id: deal_id,
            is_like: is_like
          })
            .into("deal_likes")
            .returning("*")
            .then(deal_like => {
              console.log(deal_like);
              res.status(200).json(deal_like[0]);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        } else {
          res
            .status(400)
            .json(
              "There is already a like for this user_id and deal_id combination"
            );
        }
      },
      err => {
        console.log(err);
        res.json(err);
        res.json("Could not retrieve the like from the db");
      }
    );
};

const handleDealLikeUpdate = db => (req, res) => {
  const { authorization } = req.headers;
  const deal_id = req.params.dealId;
  const { is_like } = req.body;

  const payload = jwt.decode(authorization);

  const user_id = payload.userId;
  if (!user_id) {
    return res.status(400).json("No userId in payload");
  }

  db.select("deal_id", "is_like")
    .from("deal_likes")
    .where("user_id", "=", user_id)
    .andWhere("deal_id", "=", deal_id)
    .then(
      like => {
        if (like[0]) {
          db.update({
            is_like: is_like
          })
            .where("user_id", "=", user_id)
            .andWhere("deal_id", "=", deal_id)
            .into("deal_likes")
            .returning("*")
            .then(deal_like => {
              console.log(deal_like);
              res.status(200).json(deal_like[0]);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        } else {
          res
            .status(400)
            .json(
              "There is no current like for this user_id and deal_id combination"
            );
        }
      },
      err => {
        console.log(err);
        res.json(err);
        res.json("Could not retrieve the like from the db");
      }
    );
};

const handleDealLikeDelete = db => (req, res) => {
  const { authorization } = req.headers;
  const deal_id = req.params.dealId;
  const payload = jwt.decode(authorization);

  const user_id = payload.userId;
  if (!user_id) {
    return res.status(400).json("No userId in payload");
  }

  db.select("deal_id", "is_like")
    .from("deal_likes")
    .where("user_id", "=", user_id)
    .andWhere("deal_id", "=", deal_id)
    .then(
      like => {
        console.log("**** like: ", like);
        if (like[0]) {
          db.delete()
            .where("user_id", "=", user_id)
            .andWhere("deal_id", "=", deal_id)
            .into("deal_likes")
            .returning("*")
            .then(deal_like => {
              res.status(200).json({ deleted: deal_like[0] });
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        } else {
          res
            .status(400)
            .json(
              "There is no current like for this user_id and deal_id combination"
            );
        }
      },
      err => {
        console.log(err);
        res.json(err);
        res.json("Could not retrieve the like from the db");
      }
    );
};

module.exports = {
  handleDealLikeGet,
  handleDealLikeSubmit,
  handleDealLikeUpdate,
  handleDealLikeDelete
};
