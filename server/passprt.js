const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: "your google client id",
      clientSecret: "your google client secret",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // User exists, send access token and refresh token
          const accessToken = generateAccessToken(existingUser);
          const refreshToken = generateRefreshToken(existingUser);

          return done(null, {
            user: existingUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }

        // Check if the email already exists in the database
        const userByEmail = await User.findOne({ email: profile.emails[0].value });
        if (userByEmail) {
          // Email already exists, throw an error
          return done(null, false, { message: "Email already exists" });
        }

        // Create a new user in the database
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        await newUser.save();

        // New user, send access token and refresh token
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        done(null, {
          user: newUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } catch (error) {
        done(error, false);
      }
    }
  )
);

function generateAccessToken(user) {
  const payload = {
    user: {
      id: user._id,
    },
  };

  return jwt.sign(payload, "your-access-token-secret", { expiresIn: "1h" });
}

function generateRefreshToken(user) {
  const payload = {
    user: {
      id: user._id,
    },
  };

  return jwt.sign(payload, "your-refresh-token-secret", { expiresIn: "7d" });
}

// Local authentication strategy for signup and login
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Check if the email already exists in the database
        const userByEmail = await User.findOne({ email: email });
        if (userByEmail) {
          // Email already exists, throw an error
          return done(null, false, { message: "Email already exists" });
        }

        // Create a new user in the database
        const newUser = new User({
          name: req.body.name,
          email: email,
          password: password, // Note: In a real-world scenario, you should hash the password
        });

        await newUser.save();

        // User created successfully
        return done(null, newUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Check if the user exists in the database
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          // User not found or password is incorrect
          return done(null, false, { message: "Invalid email or password" });
        }

        // User authenticated successfully
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
