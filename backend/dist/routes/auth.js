import { Router } from "express";
import passport from "passport";
const router = Router();
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    const { token } = req.user;
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 1000
    });
    res.redirect("http://localhost:3001/dashboard");
});
export default router;
