'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/destinations.json').map((e) => {
      delete e.id
      e.createdAt = e.updatedAt = new Date()
      return e
    })
    await queryInterface.bulkInsert('Destinations', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE "Destinations" RESTART IDENTITY CASCADE'
    )
  }
}
