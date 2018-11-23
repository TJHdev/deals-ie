const handleRegister = (db, bcrypt, Joi) => (req, res) => {
  const usernameSchema = Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required()
    .label("Username");

  const passwordSchema = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/) // Minimum eight characters, at least one letter, one number and one special character:
    .required()
    .label("Password")
    .error(
      () =>
        '"Password" must have: \n\u2022 Minimum eight characters.\n\u2022 One letter. (abc)\n\u2022 One number. (123)\n\u2022 One special character. (!@#)'
    );

  const emailSchema = Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .label("Email");

  const usernameIsValid = Joi.validate(req.body.username, usernameSchema, {
    abortEarly: false
  });
  const passwordIsValid = Joi.validate(req.body.password, passwordSchema, {
    abortEarly: false
  });
  const emailIsValid = Joi.validate(req.body.email, emailSchema, {
    abortEarly: false
  });

  const usernameErrors = usernameIsValid.error
    ? usernameIsValid.error.details
        .map(detail => {
          return detail.message;
        })
        .join("\n\u2022")
    : null;

  const passwordErrors = passwordIsValid.error
    ? passwordIsValid.error.details
        .map(detail => {
          return detail.message;
        })
        .join("\n\u2022 ")
    : null;

  const emailErrors = emailIsValid.error
    ? emailIsValid.error.details
        .map(detail => {
          return detail.message;
        })
        .join("\n\u2022 ")
    : null;

  if (usernameErrors || passwordErrors || emailErrors) {
    console.log("Register credentials failed schema validation");
    res.status(400).json({
      error: {
        username: usernameErrors,
        password: passwordErrors,
        email: emailErrors
      }
    });
  } else {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              username: username,
              created_at: new Date()
            })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(err => {
          console.log(err);
          let errorObject = {
            error: {
              username: null,
              password: null,
              email: null
            }
          };

          if (err.constraint === "users_username_key") {
            errorObject.error.username = "Username is already taken";
          } else if (err.constraint === "login_email_key") {
            errorObject.error.email =
              "Email is already in use. Try signing in?";
          }
          console.log("Could not finish changes to database");
          trx.rollback();
          res.status(400).json(errorObject);
        });
    }).catch(err => {
      console.log(err);
      res.status(400).json("Unable to register");
    });
  }
};

module.exports = {
  handleRegister
};
