const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
const genreController = require('../../controllers/genre-controller')
const upload = require('../../middleware/multer')

router.get('/genres/:id', genreController.getGenres)
router.put('/genres/:id', genreController.putGenre)
router.delete('/genres/:id', genreController.deleteGenre)
router.get('/genres', genreController.getGenres)
router.post('/genres', genreController.postGenre)

router.get('/users', adminController.getUser)
router.patch('/users/:id', adminController.patchUser)

router.get('/songs/create', adminController.createSong)
router.get('/songs/:id/edit', adminController.editSong)
router.get('/songs/:id', adminController.getSong)
router.put('/songs/:id', upload.single('image'), adminController.putSong)
router.delete('/songs/:id', adminController.deleteSong)
router.get('/music', adminController.getAllMusic)
router.post('/songs', upload.single('image'), adminController.postSong)
// router.get('/', adminController.admin)

router.use('/', (req, res) => {
  res.redirect('/admin/music')
})

module.exports = router
