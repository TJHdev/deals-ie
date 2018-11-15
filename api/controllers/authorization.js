const reqAuth = redisClient => (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).join("No token provided");
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("No token match");
    }
    console.log("You shall pass");
    return next();
  });
};

module.exports = {
  reqAuth
};
