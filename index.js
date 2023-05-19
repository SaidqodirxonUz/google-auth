import express from "express";
import dotenv from "dotenv";
import path from "path";
//
import authRoutes from "./routes/auth.js";
import indexRoutes from "./routes/index.js";
//
const app = express();
dotenv.config();
//

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(authRoutes);
app.use(indexRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} running`);
});
