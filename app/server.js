const { AllRoutes } = require('./router/router')

module.exports = class Application {
  #express = require('express')
  #app = this.#express()
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL)
    this.configApplication()
    this.createServer(PORT)
    this.createRoute()
    this.errorHandler()
  }
  configApplication() {
    const path = require('path')
    this.#app.use(this.#express.json())
    this.#app.use(this.#express.urlencoded({ extended: true }))
    this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')))
  }
  createServer(PORT) {
    const http = require('http')
    const server = this.#app
    server.listen(PORT, () => {
      console.log(`Server run on > port http://localhost:${PORT}`)
    })
  }
  configDatabase(DB_URL) {
    const mongoose = require('mongoose')
    const error = null
    mongoose
      .connect(DB_URL)
      .then(() => console.log('Connect to DB is successfull'))
      .catch((err) => console.log(err))
    //if(error) throw error
  }
  createRoute() {
    this.#app.get('/', (req, res, next) => {
      return res.json({
        message: 'This is a new Express Application',
      })
    })
    this.#app.use(AllRoutes)
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'صفحه یا آدرس مورد نظر یافت نشد',
      })
    })
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500
      const message = error?.message || 'Enternal Server Error'
      return res.status(status).json({
        status,
        success: false,
        message,
      })
    })
  }
}
