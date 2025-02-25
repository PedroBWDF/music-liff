const express = require('express')
const router = express.Router()

const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    // console.log('The access token expires in ' + data.body.expires_in)
    // console.log('The access token is ' + data.body.access_token)

    // 儲存access token
    spotifyApi.setAccessToken(data.body.access_token)
    spotifyApi.setRefreshToken(data.body['refresh_token'])
    // console.log('data:', data)
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err)
  }
)

router.get('/', (req, res, next) => {
  res.render('spotify')
})

router.get('/artists', (req, res, next) => {
  // console.log('artist is', req.query.artist)
  const { artist } = req.query // 確保從查詢參數中取得 artist

  if (!artist) {
    return res.status(400).send('Missing artist query parameter')
  }

  spotifyApi
    .searchArtists(artist) // 將 artist 作為搜尋查詢傳遞給 Spotify API
    .then(data => {
      // console.log('data:', data.body.artists.items)
      res.render('spotify/artists', { artists: data.body.artists.items, artist })
    })
    .catch(err => {
      console.log('The error while searching artists occurred: ', err)
      res.status(500).send('Error while fetching artists')
    })
})

router.get('/albums/:id', (req, res, next) => {
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then(
      function (data) {
        const artist = req.query.artist
        // console.log('Artist albums', data.body.items);
        res.render('spotify/albums', { albums: data.body.items, artist })
      },
      function (err) {
        console.error(err)
      }
    )
})

router.get('/tracks/:id', (req, res, next) => {
  spotifyApi
    .getAlbumTracks(req.params.id)
    .then(function (data) {
      // console.log('tracks', data.body.items);
      res.render('spotify/tracks', { tracks: data.body.items, album: req.query.album, artist: req.query.artist })
    }, function (err) {
      console.log('Something went wrong!', err)
    })
})

router.use('/', (req, res) => {
  res.redirect('/spotify')
})

module.exports = router
