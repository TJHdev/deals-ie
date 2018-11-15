const jwt = require("jsonwebtoken");

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

let redisClient;

const handleSignin = (db, bcrypt, req, res) => {
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
          .then(data => {
            console.log(data);
            return data[0];
          })
          .catch(err => {
            console.log(err);
            Promise.reject("Unable to get user");
          });
      } else {
        Promise.reject("Credentials don't match");
      }
    })
    .catch(err => {
      console.log(err);
      Promise.reject("Credentials don't match");
    });
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorised");
    }
    return res.json({ id: reply });
  });
};

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.POSTGRES_PASSWORD_SECRET, {
    expiresIn: "2 days"
  });
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = user => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token };
    })
    .catch(console.log);
};

const signinAuthentication = (redisClientTest, db, bcrypt) => (req, res) => {
  redisClient = redisClientTest;
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
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
  signinAuthentication
};
