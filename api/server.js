const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");
const Joi = require("joi");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const signout = require("./controllers/signout");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const deals = require("./controllers/deals");
const auth = require("./controllers/authorization");

const PORT = process.env.PORT || 5000;

const redis = require("redis");
const redisC = redis.createClient(process.env.REDIS_URI);

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
  connection: process.env.POSTGRES_URI
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

app.post("/signin", signin.signinAuthentication(redisC, db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt, Joi));
app.post("/signout", auth.reqAuth(redisC), signout.handleSignout(redisC));
app.get("/profile/:userId", auth.reqAuth(redisC), profile.handleProfileGet(db));
// app.put("/image", auth.reqAuth(redisC), image.handleImage(db));

app.post("/deals", deals.handleDealSubmit(db, Joi));
// app.post("/deals", auth.reqAuth(redisC), deals.handleDealSubmit(db, Joi));

// app.get("/deals", auth.reqAuth(redisC), deals.handleGetAllDeals(db, Joi));
// app.get("/deals/:id", auth.reqAuth(redisC), deals.handleGetDeals(db, Joi));
// app.put("/deals/:id", auth.reqAuth(redisC), deals.handleEditDeal(db, Joi));

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

// signin.testFunction();
// console.log("redisClient:", redisClient);

// module.exports = {
//   redis,
//   redisClient
// };
