import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import session from "express-session";
import passport from "passport";
import "./controllers/auth/googleAuthentication.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL, // your frontend URL
  credentials: true,               // allow cookies to be sent
}));

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
  console.log(`Server running on http://${process.env.BACKEND_URL}:${PORT}`);
});