import moment from 'moment';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJwt from 'passport-jwt';
import Boom from '@hapi/boom';

import * as userService from '../services/userService';

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'wow wow'
};

const pwSettings = {
  usernameField: 'email',
  session: false
};

const localStrategy = new LocalStrategy(pwSettings, async (email, password, done) => {
  const user = await userService.getUserByEmail(email);

  return await user.authenticate(password).then(
    user => {
      return done(null, user);
    },
    () => done(Boom.unauthorized('Invalid password'), false)
  );
});

const tokenStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
  try {
    const user = await userService.getUser({ id: jwtPayload.id });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (e) {
    next(Boom.unauthorized('Unauthorized'), false);
  }
});

passport.use(localStrategy);
passport.use(tokenStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authToken = passport.authenticate('bearer', { session: false, optional: false });
