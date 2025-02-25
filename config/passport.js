const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcryptjs')
const { User, Song, Genre } = require('../models')
// const db = require('../models')
// const User = db.User

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    // console.log('LocalStrategy: Checking user with email:', email)
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))

        bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) {
              return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            }
            // console.log('LocalStrategy: User found:', user)
            return cb(null, user)
          })
      })
  }
))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['email', 'profile']
},
(accessToken, refreshToken, profile, cb) => {
  const email = profile.emails[0].value
  const name = profile.displayName
  const image = profile.photos[0].value

  return User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email },
    raw: true
  })

    .then(user => {
      if (user) {
        // console.log('login user:', user)
        return cb(null, user)
      }

      return User.create({
        name,
        email,
        image,
        isAdmin: false
      })
    })
    .then(newUser => {
      return cb(null, newUser)
    })
    .catch(err => {
      console.error('Error during user creation:', err)
      cb(err)
    })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  // console.log('JWT payload:', jwtPayload)
  User.findByPk(jwtPayload.id, {
    include: [
      { model: Song, as: 'LikedSongs', include: Genre }
    ]
  })
    .then(user => {
      // console.log('user:', user)
      if (user) {
        // console.log('User found:', user)
        return cb(null, user)
      } else {
        console.warn('No user found with id:', jwtPayload.id)
        return cb(null, false)
      }
    })

    .catch(err => {
      console.error('Error during user lookup:', err)
      return cb(err)
    })
}))

// passport.serializeUser((user, cb) => {
//   cb(null, user.id)
// })
// passport.deserializeUser((id, cb) => {
//   User.findByPk(id).then(user => {
//     console.log(user)
//     暫時添加
//     console.log('deserializeUser: User found:', user)
//     return cb(null, user)
//   })
// })

module.exports = passport
