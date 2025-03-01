'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const genres = await queryInterface.sequelize.query(
      'SELECT id FROM Genres;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('songs',
      Array.from({ length: 50 }, () => ({
        title: faker.music.songName(),
        artist: faker.person.fullName(),
        album: faker.music.songName(),
        release_year: String(Math.floor(Math.random() * (2024 - 1900 + 1)) + 1900),
        image: `https://loremflickr.com/320/240/artist,singer/?random=${Math.random() * 10000}`,
        created_at: new Date(),
        updated_at: new Date(),
        genre_id: genres[Math.floor(Math.random() * genres.length)].id
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('songs', {})
  }
}
