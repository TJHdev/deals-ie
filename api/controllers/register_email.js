const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const testMailgunRoute = () => (req, res) => {
  const token = "1337token";

  var data = {
    from: "Éire Deals <donotreply@mail.eiredeals.com>",
    to: "thomasjhanna@gmail.com",
    subject: "Please verify that it's you",
    text: `Thank you for signing up to ÉireDeals.com\n\nTo verify please click to following link below or paste it into your browser.\n\nwww.eiredeals.com/complete-signup/${token}\n\n You're securely,\nThe Éire Deals Team`
  };

  mailgun.messages().send(data, function(error, body) {
    if (error) {
      console.log(error);
      return res
        .status(200)
        .json("If email is signed up sent verification email");
    }
    console.log(body);
    return res
      .status(200)
      .json("If email is signed up sent verification email");
  });
};

const requestVerifyEmail = (redisClient, db, bcrypt) => (req, res) => {
  const { email } = req.body;

  const emailSchema = Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .label("Email");

  const emailIsValid = Joi.validate(email, emailSchema, {
    abortEarly: false
  });

  const emailErrors = emailIsValid.error
    ? emailIsValid.error.details
        .map(detail => {
          return detail.message;
        })
        .join("\n\u2022 ")
    : null;

  if (emailErrors) {
    console.log("Validation email failed schema validation");
    res.status(400).json({
      error: {
        email: emailErrors
      }
    });
  } else {
    db.select("email")
      .from("login")
      .where("email", "=", email)
      .then(data => {
        if (data[0].email) {
          const jwtPayload = { userId: id };
          const token = jwt.sign(
            jwtPayload,
            process.env.POSTGRES_PASSWORD_SECRET,
            {
              expiresIn: "2 days"
            }
          );

          Promise.resolve(redisClient.set(token, email, "EX", 1800))
            .then(() => {
              // send the email using the token as part of the link
              var data = {
                from: "Éire Deals <donotreply@mail.eiredeals.com>",
                to: email,
                subject: "Please verify that it's you",
                text: `Thank you for signing up to ÉireDeals.com\n\nTo verify your email address please click to following link below or paste it into your browser.\n\nwww.eiredeals.com/complete-signup/${token}\n\n You're securely,\nThe Éire Deals Team.`
              };

              mailgun.messages().send(data, function(error, body) {
                if (error) {
                  console.log(error);
                  return res
                    .status(200)
                    .json("If email is signed up sent verification email");
                }
                console.log(body);
                return res
                  .status(200)
                  .json("If email is signed up sent verification email");
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        return Promise.reject("Something went wrong"); // TODO this needs to be removed
      });
  }

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
              console.log("***EMAIL_VERIFIED***", data[0].email_verified);
              if (data[0].email_verified === false) {
                return Promise.reject({
                  customErr: "Email not verified.\nTry checking your junk mail."
                });
              }
              return data[0];
            })
            .catch(err => {
              if (err.customErr) {
                return Promise.reject(err.customErr);
              }
              return Promise.reject("Unable to get user");
            });
        } else {
          console.log("Bcrypt is invalid");
          return Promise.reject("Credentials don't match");
        }
      })
      .catch(err => {
        console.log("Promise inside handleSignin:", err);
        return Promise.reject(err);
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

  const signToken = id => {
    const jwtPayload = { userId: id };
    return jwt.sign(jwtPayload, process.env.POSTGRES_PASSWORD_SECRET, {
      expiresIn: "2 days"
    });
  };

  const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value));
  };

  const createSessions = user => {
    const { id } = user;
    const token = signToken(id);
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
  requestVerifyEmail,
  testMailgunRoute
};
