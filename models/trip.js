'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.User, { foreignKey: 'userId' })
      // Define association with TripDestination
      Trip.belongsToMany(models.Destination, { through: models.TripDestination, foreignKey: 'tripId' })
    }
  }
  Trip.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Trip',
  })
  return Trip
}
