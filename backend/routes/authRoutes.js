import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const router = express.Router();

// Configure Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you could save/find user in MongoDB
      return done(null, profile);
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "http://localhost:3000/dashboard",
  })
);

router.get("/failure", (req, res) => {
  res.send("❌ Google login failed");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("http://localhost:3000");
  });
});

// GET /auth/user
router.get("/user", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ error: "Not logged in" });
});

export default router;
