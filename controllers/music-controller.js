const { Song, Genre, Comment, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const musicController = {
  getAllMusic: (req, res, next) => {
    // const user = req.user.toJSON()
    const DEFAULT_LIMIT = 12
    const genreId = Number(req.query.genreId) || ''
    const page = Number(req.query.page) || 1
    const limit = DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Promise.all([Song.findAndCountAll({
      include: Genre,
      where: {
        ...genreId ? { genreId } : {}
      },
      offset,
      limit,
      nest: true,
      raw: true
    }),
    Genre.findAll({ raw: true })
    ])

      .then(([songs, genres]) => {
        // console.log('songs.rows:', songs.rows)
        // const likedSongsId = req.user && req.user.LikedSongs.map(ls => ls.id)
        const likedSongsId = req.user ? req.user.LikedSongs.map(ls => ls.id) : []
        console.log('likedSongsId:', likedSongsId)
        const data = songs.rows.map(s => ({
          ...s,
          isLiked: likedSongsId.includes(s.id)
        }))

        return res.render('all-music', { user: res.locals.user, songs: data, genres, genreId, pagination: getPagination(limit, page, songs.count) })
      })

      .catch(err => next(err))
  },

  getSong: (req, res, next) => {
    return Song.findByPk(req.params.id, {
      include: [
        Genre, // 跟song關聯的genre
        { model: Comment, include: User }, // 跟song關聯的comment的user
        { model: User, as: 'LikedUsers' }
      ]
      // 拿掉nest跟raw: true
    })
      .then(song => {
        if (!song) { throw new Error("The song doesn't exist!") }
        console.log('LikedUsers:', song.LikedUsers)
        const isLiked = req.user && song.LikedUsers.some(lu => lu.id === req.user.id) // 確認req.user存在 
        console.log('isLiked:', isLiked)
        // console.log('user:', res.locals.user)
        res.render('song', { user: res.locals.user, song: song.toJSON(), isLiked })
      })
      .catch(err => next(err))
  },

  getLatestSongs: (req, res, next) => {
    return Song.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [Genre],
      raw: true,
      nest: true
    })
      .then(songs => {
        res.render('latest-songs', { user: res.locals.user, songs })
      })
      .catch(err => next(err))
  }
}

module.exports = musicController
