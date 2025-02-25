const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // if (err || !user) {
    //   console.error('Error during authentication:', err)
    // return res.status(401).json({ status: 'error', message: 'unauthorized' })
    //   throw new Error('unauthorized')
    // }

    if (err) console.error('Error during authentication:', err)
    if (!user) throw new Error('Unauthorized! Please log in')

    req.user = user.toJSON()
    res.locals.user = user.toJSON()
    // console.log('Req.user:', user.toJSON())
    next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    // return res.status(403).json({ status: 'error', message: 'permission denied' })
    throw new Error('unauthorized')
  }
}

module.exports = {
  authenticated,
  authenticatedAdmin
}
