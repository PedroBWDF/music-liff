'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Songs', 'category_id')

    // 移除 Songs 表的 genre 欄位
    await queryInterface.removeColumn('Songs', 'genre')

    // 刪除 Categories 表
    await queryInterface.dropTable('Categories')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    // 在 Songs 表中添加 category_id 外鍵
    await queryInterface.addColumn('Songs', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })

    // 在 Songs 表中添加 genre 欄位
    await queryInterface.addColumn('Songs', 'genre', {
      type: Sequelize.STRING
    })
  }
}
