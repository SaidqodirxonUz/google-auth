import express from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
//
const app = express();
dotenv.config();
//
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
  })
);
//
import authRoutes from "./routes/auth.js";
import indexRoutes from "./routes/index.js";
//
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
//
app.use(authRoutes);
app.use(indexRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} running`);
});
