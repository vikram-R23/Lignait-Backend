const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback" // Matches Google Console
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (user) {
        return done(null, user);
      }

      // If not, check if email exists (link accounts)
      user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (user) {
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }

      // Create new user
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName || 'User',
        password: null // No password for Google users
      });

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});