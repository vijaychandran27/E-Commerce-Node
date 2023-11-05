const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// const bcrypt = require('bcrypt');


async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ username: username }).exec();

    if (!user) {
      return { status: 401, message: 'Incorrect password.' };
    }

    // const saltRounds = 10;

    // const hashPassword = await bcrypt.hash(user.password, saltRounds, async (err, hash) => {
    //   if (err) {
    //     return '';
    //   } else {
    //     return hash;
    //   }
    // });

    // const isMatch = await bcrypt.compare(password, hashPassword);

    const isMatch = password === user.password;
    if (isMatch) {
      return user;
    } else {
      return { status: 401, message: 'Incorrect password.' };
    }
  } catch (error) {
    throw error;
  }
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await authenticateUser(username, password);
      done(null, result);
    } catch (error) {
      console.error('Unexpected error:', error);
      done(error, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
