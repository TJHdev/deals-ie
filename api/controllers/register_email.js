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
    text: `Thank you for signing up to ÉireDeals.com\n\nTo verify please click to following link below or paste it into your browser.\n\nwww.eiredeals.com/complete-signup/${token}\n\nYou're securely,\nThe Éire Deals Team`
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

const requestVerifyEmail = (redisClient, db, bcrypt, Joi) => (req, res) => {
  const { email } = req.body;
  console.log("email: ", email);

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
          const jwtPayload = { email: email };
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
                text: `Thank you for signing up to ÉireDeals.com\n\nTo verify your email address please click to following link below or paste it into your browser.\n\nhttp://www.eiredeals.com/complete-signup?token=${token}\n\n You're securely,\nThe Éire Deals Team.`
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
        } else {
          console.log("Couldn't find the email in the database");
        }
      })
      .catch(err => {
        return Promise.reject("Something went wrong"); // TODO this needs to be removed
      });
  }
};

const verifyEmail = (redisClient, db, bcrypt, Joi) => (req, res) => {
  const { token } = req.body;

  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("No token match");
    }
    if (!reply.includes("@")) {
      return res.status(401).json("That token is for login");
    }

    const email = reply;

    db.update({
      email_verified: true
    })
      .where("email", "=", email)
      .into("users")
      .returning("email", "email_verified")
      .then(user => {
        console.log(user);
        res.status(200).json({
          is_like: user[0]
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};

module.exports = {
  testMailgunRoute,
  requestVerifyEmail,
  verifyEmail
};
