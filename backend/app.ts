import express from "express";
import session from "express-session";
import passport from "passport";
import "./controllers/auth/googleAuthentication.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js"
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  session({
    secret: "some-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(authRoutes);
app.use(apiRoutes);

app.get("/", (req, res) => {
  res.send(req.user ? `Hello ${req.user}` : "Not logged in");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});