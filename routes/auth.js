import express from "express";
import passport from "passport";
import { Strategy as Strategy } from "passport-google-oauth20";
import { randomUUID, verify } from "crypto";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();
const users = [];

const router = express.Router();

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function verify(accesToken, refreshToken, profile, done) {
      const exestingUser = users.find((u) => u.googleId === profile.id);

      if (exestingUser) {
        return done(null, {
          id: exestingUser.id,
          fullname: exestingUser.displayName,
        });
      }

      const newUser = {
        id: randomUUID(),
        username: profile.displayName,
        googleId: profile.id,
      };

      users.push(newUser);
      done(null, {
        id: newUser.id,
        fullName: newUser.username,
      });
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
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
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
