import express from "express";
import passport from "passport";
import localStrategy from "passport-local";

const users = [];

const router = express.Router();

passport.use(
  new localStrategy(function verify(username, password, cb) {
    users.find((u) => u.username === username && u.password === password);

    if (users) {
      return cb(`incorrect Username or password`);
    }

    cb(null, user);
  })
);

// passport.serializeUser((user, done) => {
//   done({ id: user.id, username: user.username });
// });
// passport.deserializeUser((user, done) => {
//   done({ id: user.id });
// });

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

export default router;
