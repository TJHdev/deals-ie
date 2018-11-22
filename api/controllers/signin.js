const jwt = require("jsonwebtoken");

const signinAuthentication = (redisClient, db, bcrypt) => (req, res) => {
  const handleSignin = (db, bcrypt, req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

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
              return data[0];
            })
            .catch(err => {
              console.log("Unable to get user:", err);
              return Promise.reject("Unable to get user");
            });
        } else {
          console.log("Bcrypt is invalid");
          return Promise.reject("Credentials don't match");
        }
      })
      .catch(err => {
        console.log("Promise inside handleSignin:", err);
        return Promise.reject("Credentials don't match");
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

  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
        .then(data => {
          console.log("Data", data);
          return data && data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then(session => res.json(session))
        .catch(err => {
          console.log("Last catch: ", err);
          res.status(400).json({ error: { password: err } });
        });
};

module.exports = {
  signinAuthentication
};
