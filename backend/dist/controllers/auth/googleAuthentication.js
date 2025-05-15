var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: "/auth/google/callback",
}, function (accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        return done(null, { token });
    });
}));
