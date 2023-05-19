import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { randomUUID, verify } from "crypto";
import dotenv from "dotenv";

dotenv.config();
const users = [];

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "http://localhost:8000/auth/google" &&
        "https://realcoderuz.onrender.com/auth/google",
    },
    function verify(accesToken, refreshToken, done) {
      console.log(profile);
      done("Error");
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});
passport.deserializeUser((req, user, done) => {
  req.user = { id: user.id, username: user.username };
  done(null, req.user);
  // done({ id: user.id });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get(
  "/auth/isGoogle",
  passport.authenticate("google", { scope: ["profile"] }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const exestingUser = users.find((u) => u.username === username);
  if (exestingUser) {
    return res.sendStatus(400);
  }

  users.push({
    id: randomUUID,
    username,
    password,
  });

  res.redirect("/login");
});

export default router;

// profile._json.sub;

// profile._json.name;

// profile._json.picture;
