const jwt = require("jsonwebtoken");

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URI);

// const server = require("../server.js");
// const redisClient = require("../server.js").redisClient;
// const register = require("./register.js");

// const testFunction = () => {
//   console.log("server:", server);
//   console.log("jwt:", jwt);
// };

// console.log("redisClient: ", redisClient);
// console.log(require("../server"));

// console.log("server: ", server);
// console.log("register: ", register);

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Promise.reject("Must enter a username and password");
  }

  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(data => data[0])
          .catch(err => {
            Promise.reject("Unable to get user");
          });
      } else {
        Promise.reject("Credentials don't match");
      }
    })
    .catch(err => Promise.reject("Credentials don't match"));
};

const getAuthToken = (req, res) => {
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorised");
    }
    return res.json({ id: reply });
  });
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthToken(req, res)
    : handleSignin(db, bcrypt, req, res)
        .then(data => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};

module.exports = {
  signinAuthentication,
  redisClient
};
