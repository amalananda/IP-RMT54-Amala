if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()

// comment for testing
// const PORT = process.env.PORT || 3000

// const { authentication } = require("./middlewares/autohentication")
const errorHandler = require("./middlewares/errorHandler")
// const Controller = require("./controller/homeController");
const userRoute = require('./routes/userRoute')
const destinationRoute = require('./routes/destinationRoute')
const tripRoute = require('./routes/tripRoute')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.get('/', Controller.welcomePage)

//User
app.use('/', userRoute)
app.use('/', destinationRoute)
app.use('/', tripRoute)



//error handler
app.use(errorHandler)

//comment for testing
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })

module.exports = app
