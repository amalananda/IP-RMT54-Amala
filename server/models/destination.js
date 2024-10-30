'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.belongsToMany(models.Trip, {
        through: models.TripDestination,
        foreignKey: 'destinationId',
      })

    }
  }
  Destination.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Membuat nama destinasi unik
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true // Validasi bahwa imageUrl adalah URL yang benar
      }
    }
  }, {
    sequelize,
    modelName: 'Destination',
  })
  return Destination
}
