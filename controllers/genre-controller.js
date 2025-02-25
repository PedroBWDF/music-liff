const { Genre } = require('../models')

const genreController = {
  getGenres: (req, res, next) => {
    return Promise.all([
      Genre.findAll({ raw: true }),
      req.params.id ? Genre.findByPk(req.params.id, { raw: true }) : null
    ])

      .then(([genres, genre]) => {
        res.render('admin/genres', { genres, genre })
      })
      .catch(err => next(err))
  },

  postGenre: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Genre name is required!')
    return Genre.create({
      name
    })

      .then(() => {
        req.flash('success_messages', `The genre "${name}" is successfully created`)
        res.redirect('/admin/genres')
      })
      .catch(err => next(err))
  },

  putGenre: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Genre name is required!')
    return Genre.findByPk(req.params.id)

      .then(genre => {
        if (!genre) throw new Error("Genre doesn't exist!")
        return genre.update({ name })
      })
      .then(() => {
        req.flash('success_messages', `The genre "${name}" is successfully updated`)
        res.redirect('/admin/genres')
      })
      .catch(err => next(err))
  },

  deleteGenre: (req, res, next) => {
    const { name } = req.body

    return Genre.findByPk(req.params.id)
      .then(genre => {
        if (!genre) throw new Error("The genre doesn't exist!")
        return genre.destroy()
      })

      .then(() => {
        req.flash('success_messages', `The genre "${name}" is successfully deleted`)
        res.redirect('/admin/genres')
      })
      .catch(err => next(err))
  }
}

module.exports = genreController
