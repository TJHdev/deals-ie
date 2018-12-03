const reqAuth = redisClient => (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("No token provided");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("No token match");
    }
    console.log("You shall pass");
    // res.locals.userid = token // this should be used if there was no redis database
    return next();
  });
};

const checkAuth = redisClient => (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    // res.status(401).json("No token provided");
    return next();
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      // res.status(401).json("No token match");
      return next();
    }
    console.log("You shall pass");
    res.locals.authorization = authorization; // this should be used if there was no redis database
    // res.locals.userid = authorization; // this should be used if there was no redis database
    return next();
  });
};

module.exports = {
  reqAuth,
  checkAuth
};
