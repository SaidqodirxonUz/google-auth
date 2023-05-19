import express from "express";
import { ensureLoggedIn } from "connect-ensure-login";

const router = express.Router();

router.get("/", ensureLoggedIn("/login"), (req, res) => {
  res.render("index");
});

router.get("/private-policy", (req, res) => {
  res.render("policy");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/about", (req, res) => {
  res.render("about");
});

export default router;

// realcoderuz.onrender.com/about

// https://realcoderuz.onrender.com/private-policy

// https://realcoderuz.onrender.com/terms

// http://localhost:8000/auth/google
