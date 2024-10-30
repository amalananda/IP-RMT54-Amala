'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TripDestination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TripDestination.belongsTo(models.Trip, {
        foreignKey: 'tripId',
        as: 'trip'
      })
      TripDestination.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      })
    }
  }
  TripDestination.init({
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trip',
        key: 'id'
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Destination',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'TripDestination',
  })
  return TripDestination
}
