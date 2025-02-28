'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.belongsToMany(models.Song, {
        through: models.Like,
        foreignKey: 'userId',
        as: 'LikedSongs'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    lineUuid: { type: DataTypes.STRING, unique: true },
    lineDisplayName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  })
  return User
}
