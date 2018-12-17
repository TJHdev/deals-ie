const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const requestPasswordReset = (redisClient, db, bcrypt, Joi) => (req, res) => {
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

          Promise.resolve(redisClient.set(token, email, "EX", 600))
            .then(() => {
              // send the email using the token as part of the link
              var data = {
                from: "Éire Deals <donotreply@mail.eiredeals.com>",
                to: email,
                subject: "Please change your password",
                text: `Thank you for reseting your ÉireDeals.com password\n\nPlease click the link to change your password.\n\nhttp://www.eiredeals.com/reset-password?token=${token}\n\n You're securely,\nThe Éire Deals Team.`
              };

              mailgun.messages().send(data, function(error, body) {
                if (error) {
                  console.log(error);
                  return res
                    .status(200)
                    .json("If email is signed up, validation email sent");
                }
                console.log(body);
                return res
                  .status(200)
                  .json("If email is signed up, validation email sent");
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

const passwordReset = (redisClient, db, bcrypt, Joi) => (req, res) => {
  const { token } = req.body;

  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("No token match");
    }

    const newPasswordSchema = Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) // Minimum eight characters, at least one letter, one number and one special character:
      .required()
      .label("newPassword")
      .error(
        () =>
          '"newPassword" must have: \n\u2022 Minimum eight characters.\n\u2022 One letter. (abc)\n\u2022 One number. (123)\n\u2022 One special character. (!@#)'
      );

    const repeatPasswordSchema = Joi.string()
      .required()
      .valid(Joi.ref("newPassword"));

    const newPasswordIsValid = Joi.validate(
      req.body.new_password,
      newPasswordSchema,
      {
        abortEarly: false
      }
    );

    const repeatPasswordIsValid = Joi.validate(
      req.body.repeat_password,
      repeatPasswordSchema,
      { abortEarly: false }
    );

    const newPasswordErrors = newPasswordIsValid.error
      ? newPasswordIsValid.error.details
          .map(detail => {
            return detail.message;
          })
          .join("\n\u2022 ")
      : null;

    const repeatPasswordErrors = repeatPasswordIsValid.error
      ? repeatPasswordIsValid.error.details
          .map(detail => {
            return detail.message;
          })
          .join("\n\u2022 ")
      : null;

    if (newPasswordErrors || repeatPasswordErrors) {
      console.log("Register credentials failed schema validation");
      res.status(400).json({
        error: {
          new_password: newPasswordErrors,
          repeat_password: repeatPasswordErrors
        }
      });
    }

    const email = reply;
    const hash = bcrypt.hashSync(password);

    db.update({
      hash: hash
    })
      .where("email", "=", email)
      .into("login")
      .returning("email")
      .then(user => {
        console.log(user);

        redisClient.del(authorization, (err, reply) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(200).json({
          email: user[0]
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};

module.exports = {
  requestPasswordReset,
  passwordReset
};
