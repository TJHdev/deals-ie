const redisClient = require("./signin").redisClient;

console.log(redisClient);

const handleSignout = () => (req, res) => {
  const { authorization } = req.headers;

  return redisClient.del(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorised");
    }
    return res.json({ id: reply });
  });
};

module.exports = {
  handleSignout
};
