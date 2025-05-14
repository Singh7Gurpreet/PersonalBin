import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails?.[0].value;
      const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      return done(null, { token });
    }
  )
);
