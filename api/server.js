const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");
const Joi = require("joi");

const emails = require("./controllers/register_email");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const signout = require("./controllers/signout");
const password = require("./controllers/password");
const profile = require("./controllers/profile");
const deals = require("./controllers/deals");
const deal_likes = require("./controllers/deal_likes");
const auth = require("./controllers/authorization");

const PORT = process.env.PORT || 5000;

const redis = require("redis");
const redisPasswordC = redis.createClient(process.env.REDIS_PASSWORD_URI);
const redisVerifyEmailC = redis.createClient(
  process.env.REDIS_VERIFY_EMAIL_URI
);
const redisResetPasswordC = redis.createClient(
  process.env.REDIS_RESET_PASSWORD_URI
);

// const db =
//   process.env.NODE_ENV === "production"
//     ? knex({
//         client: "pg",
//         connection: {
//           connectionString: process.env.DATABASE_URL,
//           ssl: true
//         }
//       })
//     : knex({
//         client: "pg",
//         connection: {
//           host: "127.0.0.1",
//           user: "postgres",
//           password: "testpassword",
//           database: "deals"
//         },
//         debug: true
//       });

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
  debug: true
});

// const whiltelist = ["http://example1.com", "http://example2.com"];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whiltelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

// *************
// misc routes
// *************
app.get("/", (req, res) => {
  res.send("It is working!");
});

// app.get("/", (req, res) => {
//   db.select("*")
//     .from("users")
//     .then(
//       users => {
//         res.json(users);
//       },
//       err => {
//         res.json("Couldn't retrieve users");
//       }
//     );
// });

app.get("/test", (req, res) => {
  db.select("*")
    .from("users")
    .then(
      users => {
        res.json(users);
      },
      err => {
        res.json(err);
      }
    );
});

// *************
// signup routes
// *************
app.post("/register", register.handleRegister(db, bcrypt, Joi));
app.post("/signin", signin.signinAuthentication(redisPasswordC, db, bcrypt));
app.post(
  "/signout",
  auth.reqAuth(redisPasswordC),
  signout.handleSignout(redisPasswordC)
);
app.get(
  "/profile/:userId",
  auth.reqAuth(redisPasswordC),
  profile.handleProfileGet(db)
);

// ***********************
// completing registration
// ***********************
// app.post("/emails/test", emails.testMailgunRoute());
app.post(
  "/register/request-verify-email",
  emails.requestVerifyEmail(redisVerifyEmailC, db, bcrypt, Joi)
);
app.post(
  "/register/verify-email",
  emails.verifyEmail(redisVerifyEmailC, db, bcrypt, Joi)
);

// ******************
// resetting password
// ******************

app.post(
  "/profile/request-password",
  password.requestPasswordReset(redisResetPasswordC, db, bcrypt, Joi)
);
app.put(
  "/profile/password",
  password.passwordReset(redisResetPasswordC, db, bcrypt, Joi)
);

// ***********
// deal routes
// ***********
app.get(
  "/deals/:dealId",
  auth.checkAuth(redisPasswordC),
  deals.handleGetDeal(db)
);
app.get("/deals", auth.checkAuth(redisPasswordC), deals.handleGetAllDeals(db));
app.post(
  "/deals",
  auth.reqAuth(redisPasswordC),
  deals.handleDealSubmit(db, Joi)
);

// ***************
// like end points
// ***************
app.get(
  "/deals/:dealId/like",
  auth.reqAuth(redisPasswordC),
  deal_likes.handleDealLikeGet(db)
);
app.post(
  "/deals/:dealId/like",
  auth.reqAuth(redisPasswordC),
  deal_likes.handleDealLikeSubmit(db)
);
app.patch(
  "/deals/:dealId/like",
  auth.reqAuth(redisPasswordC),
  deal_likes.handleDealLikeUpdate(db)
);
app.delete(
  "/deals/:dealId/like",
  auth.reqAuth(redisPasswordC),
  deal_likes.handleDealLikeDelete(db)
);

// app.post("/deals", auth.reqAuth(redisC), deals.handleDealSubmit(db, Joi));

// app.get("/deals", auth.reqAuth(redisC), deals.handleGetAllDeals(db, Joi));
// app.get("/deals/:id", auth.reqAuth(redisC), deals.handleGetDeals(db, Joi));
// app.put("/deals/:id", auth.reqAuth(redisC), deals.handleEditDeal(db, Joi));

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

// signin.testFunction();
// console.log("redisClient:", redisClient);
