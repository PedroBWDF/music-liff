const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
// const jwt = require('jsonwebtoken')
const oauth = require('./oauth')
const liff = require('./api/liff')

const musicController = require('../controllers/music-controller')
const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const checkUser = require('../middleware/check-user')
const { generalErrorHandler } = require('../middleware/error-handler')
const upload = require('../middleware/multer')

// 引入admin
const admin = require('./modules/admin')
const spotify = require('./modules/spotify')

router.get('/123', (req, res, next) => {
  res.send('Hello, World!')
})

router.get('/comments/latest', checkUser, commentController.getLatestComments)
router.delete('/comments/:id', authenticated, authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

router.post('/like/:songId', authenticated, userController.addLike)
router.delete('/like/:songId', authenticated, userController.removeLike)

router.get('/music', checkUser, musicController.getAllMusic)
router.get('/songs/latest', checkUser, musicController.getLatestSongs)
router.get('/songs/:id', checkUser, musicController.getSong)

router.use('/admin', authenticated, authenticatedAdmin, admin)
router.use('/spotify', checkUser, spotify)

router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)
router.get('/users/:id/likedsongs', authenticated, userController.getLikedSongs)
router.get('/users/:id/edit', authenticated, userController.editUser)
router.get('/users/:id', authenticated, userController.getUser)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/login', userController.logInPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', session: false, failureFlash: true }), userController.logIn)
router.get('/logout', userController.logout)

router.use('/oauth', oauth)
router.use('/api/liff', liff)
router.use('/', generalErrorHandler)

// router.use為路由加上middleware。若上面路由都未符合，就redirect到/music
router.use('/', (req, res) => {
  res.redirect('/music')
})

module.exports = router
