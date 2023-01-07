require('dotenv').config();

// set up express app
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

// connect to database instance
const pgp = require("pg-promise")();
const db = pgp(process.env.POSTGRES_URL);

// TODO: Refactor code
// jwt gen set up
const jwt = require("jsonwebtoken");

const jwtGenerator = (user_id) => {
  const payload = {user: user_id}

  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1hr"});
}

// jwt middleware
const jwtAuthorization = async(req, res, next) => {
  const jwtToken = req.header("token");

  if (!jwtToken) {
    return res.status(403).json("Not Authorized");
  }

  try {
    const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(403).json("Invalid token");
  }
}

// private routes
app.get("/verify", jwtAuthorization, async(req, res) => {
    try {
      res.json(true);
    } catch (e) {
      console.log(e.message);
    }
  }
);

// adds a new user to the database
app.route("/register")
	.post(async (req, res) => {
		try {
			console.log(req.body);

      const {user_name, user_pw} = req.body;

      const doesUserExist = await db.query(
        "SELECT * FROM users WHERE user_name = $1;",
        [user_name]
      );
      
      console.log(doesUserExist.length);

      // check if user_name exists
      if (doesUserExist.length > 0) {
        console.log("USER EXISTS!");
        return res.status(403).json("User already exists");
      } else {
        // i.e., user_name does not exist
        // encrypt user_pw
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(user_pw.toString(), salt);

        const newUser = await db.query(
          "INSERT INTO users(user_name, user_pw) VALUES($1, $2) RETURNING *;", 
          [user_name, bcryptPassword]
        );
          
        const userId = newUser[0].user_id;
        console.log(userId);

        // generate jwt token
        const token = jwtGenerator(userId);

        res.json({received : "true", error : "none", jwtToken : `${token}`});
      }
		} catch (e) {
			console.log(e.message);
		}
	}
);

app.route("/login")
  .post(async (req, res) => {
    const {user_name, user_pw} = req.body;
    const password = user_pw.toString();

    const user = await db.query(
      "SELECT * FROM users WHERE user_name = $1",
      [user_name]
    );

    if (user.length < 1) {
      return res.status(403).json("User does not exist");
    } 

    const isValidPassword = await bcrypt.compare(password, user[0].user_pw);

    if (!isValidPassword) {
      res.json({received : "true", error : "invalid password",});
      return;
    } else {
      console.log("SUCCESSFUL LOG IN");
    }

    const token = jwtGenerator(user[0].user_id);
    res.json({jwtToken: `${token}`});
  }
);

// dashboard route
app.get("/dashboard", jwtAuthorization, async(req, res) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.log(e.message);
  }
})

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON ${PORT}`);
})