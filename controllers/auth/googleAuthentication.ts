import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import config from "../../configs/default.js";

passport.use(
  new GoogleStrategy(
    {
      clientID:  config.GOOGLE_OAUTH_CLIENT,
      clientSecret: config.GOOGLE_OAUTH_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function(accessToken, refreshToken, profile,done) {
      const email = profile.emails?.[0].value;
      const token = jwt.sign({ email }, config.JWT_SECRET!, {
        expiresIn: "30d",
      });
      return done(null,{token});
    }
  )
);