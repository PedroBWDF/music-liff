const passport = require('../config/passport')

const checkUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err)
      return next()
    }
    if (user) {
      req.user = user
      res.locals.user = user.toJSON()
      delete res.locals.user.password
      console.log('res.locals.user:', res.locals.user)
    }
    next()
  })(req, res, next)
}

module.exports = checkUser
