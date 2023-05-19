import express from "express";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { randomUUID } from "crypto";

const users = [];

const router = express.Router();

passport.use(
  new localStrategy(function verify(username, password, cb) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return cb(`incorrect Username or password`);
    }

    cb(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});
passport.deserializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
  // done({ id: user.id });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("index");
});

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
