import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import insertKey from "../../utils/putKeyRedis.js";
import dotenv from 'dotenv';
import { RedisArgument } from "redis";
import { connect } from "http2";
dotenv.config();
passport.use(

  new GoogleStrategy(
    {
      clientID:  process.env.GOOGLE_OAUTH_CLIENT!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      passReqToCallback: true
    },
    async function(req,accessToken, refreshToken, profile,done) {
      try{
        const email = profile.emails?.[0].value;
      const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      const session = req.query.state as RedisArgument;
      if(session !== undefined) {
        await insertKey(session,token);
      }
      return done(null,{token});
    } catch(error) {
      console.log(error);
    }
  }
));