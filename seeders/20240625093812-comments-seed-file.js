'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query( // 用sequelize查詢取出所有user
      'SELECT id FROM users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const songs = await queryInterface.sequelize.query(
      'SELECT id FROM songs;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('comments',
      Array.from({ length: 111 }, () => ({
        text: faker.lorem.sentence(),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        song_id: songs[Math.floor(Math.random() * songs.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      })))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('comments', null, {})
  }
}
