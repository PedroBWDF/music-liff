const { Comment, User, Song } = require('../models')

const commentController = {
  postComment: (req, res, next) => {
    const { songId, text } = req.body
    const userId = req.user.id
    if (!userId) throw new Error('User is required!')
    if (!text) throw new Error('Comment text is required!')

    return Promise.all([
      Song.findByPk(songId), // 反查關聯的song
      User.findByPk(userId)
    ])

      .then(([song, user]) => {
        if (!song) throw new Error("The song doesn't exist!")
        if (!user) throw new Error("The user doesn't exist!")
        return Comment.create({
          text,
          songId,
          userId
        })
      })
      .then(() => {
        req.flash('success_messages', 'The comment is successfully created!')
        res.redirect(`/songs/${songId}`)
      })
      .catch(err => next(err))
  },

  deleteComment: (req, res, next) => {
    return Comment.findByPk(req.params.id)

      .then(comment => {
        if (!comment) throw new Error("The comment doesn't exist!")
        return comment.destroy()
      })
      .then(deletedComment => {
        req.flash('success_messages', 'The comment is successfully deleted!')
        // console.log(deletedComment)
        res.redirect(`/songs/${deletedComment.songId}`)
      })
      .catch(err => next(err))
  },

  getLatestComments: (req, res, next) => {
    return Comment.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [Song, User],
      raw: true,
      nest: true

    })
      .then(comments => {
        // console.log('comments:', comments)
        res.render('latest-comments', { user: res.locals.user, comments })
      })
      .catch(err => next(err))
  }
}

module.exports = commentController
