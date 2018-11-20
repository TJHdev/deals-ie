const handleRegister = (db, bcrypt) => (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "Must provide all fields" });
  } else {
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
          let responseErrorMessage;

          if (err.constraint === "users_username_key") {
            responseErrorMessage = "Username is already taken";
          } else if (err.constraint === "login_email_key") {
            responseErrorMessage = "Email is already in use. Try signing in?";
          }
          console.log("Could not finish changes to database");
          trx.rollback();
          res.status(400).json({ error: responseErrorMessage });
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
