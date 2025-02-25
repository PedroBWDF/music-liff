const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/music',
    // failureRedirect: '/login',
    session: false
  }), (req, res) => {
    const userData = req.user
    // console.log('User Data in signIn:', userData)

    const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' }) // 將 req.user 改成 userData

    res.cookie('jwt', token, {
      httpOnly: true, // 防止客户端 JavaScript 存取
      data: {
        user: userData
      }
    })
    // Successful authentication, redirect home.
    req.flash('success_messages', '成功登入！')
    res.redirect('/music')
  })

module.exports = router
