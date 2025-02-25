const { Song, User, Genre } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getAllMusic: (req, res, next) => {
    Song.findAll({
      raw: true,
      nest: true,
      include: [Genre]
    })

      .then(allmusic => {
        res.render('admin/all-music', { user: res.locals.user, songs: allmusic })
      })
    // return res.render('admin/all-music', { user: res.locals.user })
      .catch(err => next(err))
  },

  createSong: (req, res, next) => {
    return Genre.findAll({
      raw: true
    })

      .then(genres => {
        res.render('admin/create-song', { genres })
      })
      .catch(err => next(err))
  },

  postSong: (req, res, next) => {
    const { title, album, artist, releaseYear, genreId } = req.body
    if (!title) throw new Error('Song title is required!')

    const { file } = req
    localFileHandler(file)
      .then(filePath =>
        Song.create({
          title,
          album,
          artist,
          releaseYear,
          image: filePath || null,
          genreId
        })
      )

      .then(() => {
        req.flash('success_messages', 'the song was successfully created')
        // console.log('Flash message:', req.flash('success_messages'))
        res.redirect('/admin/music')
      })

      .catch(err => next(err))
  },

  getSong: (req, res, next) => {
    Song.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Genre]
    })

      .then(song => {
        if (!song) { throw new Error("The song doesn't exist!") }
        res.render('admin/song', { user: res.locals.user, song })
      })

      .catch(err => next(err))
  },

  editSong: (req, res, next) => {
    return Promise.all([
      Genre.findAll({
        raw: true
      }),
      Song.findByPk(req.params.id, {
        raw: true
      })
    ])

      .then(([genres, song]) => {
        if (!song) { throw new Error("The song doesn't exist!") }
        console.log('genres:', genres)
        console.log('song:', song)
        res.render('admin/edit-song', { user: res.locals.user, song, genres })
      })
  },

  putSong: (req, res, next) => {
    const { title, album, artist, releaseYear, genreId } = req.body
    if (!title) throw new Error('Song title is required!')

    const { file } = req
    Promise.all([
      Song.findByPk(req.params.id),
      localFileHandler(file)
    ])

      .then(([song, filePath]) => {
        if (!song) throw new Error("The song doesn't exist!")

        return song.update({
          title,
          album,
          artist,
          releaseYear,
          image: filePath || song.image,
          genreId
        })
      })
    // Song.findByPk(req.params.id)
    //   .then(song => {
    //     if (!song) throw new Error("The song doesn't exist!")
    //     return song.update({
    //       title,
    //       album,
    //       artist,
    //       releaseYear
    //     })
    //   })

      .then(() => {
        req.flash('success_messages', 'the song was successfully updated')
        res.redirect('/admin/music')
      })

      .catch(err => next(err))
  },

  deleteSong: (req, res, next) => {
    Song.findByPk(req.params.id)
      .then(song => {
        if (!song) throw new Error("The song doesn't exist!")
        return song.destroy()
      })

      .then(() => {
        req.flash('success_messages', 'the song was successfully deleted')
        res
          .redirect('/admin/music')
      })
      .catch(err => next(err))
  },

  getUser: (req, res, next) => {
    User.findAll({
      raw: true
    })

      .then(users => {
        res.render('admin/users', { user: res.locals.user, users })
      })
      .catch(err => next(err))
  },

  patchUser: (req, res, next) => {
    const id = req.params.id
    return User.findByPk(id)

      .then(user => {
        if (!user) throw new Error("User doesn't exist!")
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限')
          return res.redirect('back')
        }

        return user.update(
          { isAdmin: !user.isAdmin }
          // ,{ where: { id: user.id } }
          // 已經是instance操作，不用where
        )
      })

      .then(() => {
        req.flash('success_messages', '使用者權限變更成功')
        return res.redirect('/admin/users')
      })

      .catch(err => next(err))
  }
}

module.exports = adminController
