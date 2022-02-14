const express = require('express')
const serviceHandlers = require('../service-handlers')

module.exports = () => {
  const router = express.Router()

  router.use('/search', async (req, res, next) => {
    try {
      const beers = await serviceHandlers.searchBeer(req.query)
      res.json(beers)
    } catch (error) {
      next(error)
    }
  })

  return router
}
