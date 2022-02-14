const express = require('express')
const path = require('path');
const fs = require('fs')
const logger = require('morgan')
const cors = require('cors')
const beerRouter = require('./beerRouter')

module.exports = (config) => {
  const app = express()

  app.use(cors())
  app.use(logger('dev'))

  app.get('/', (req, res) => {
    console.log(path.join(__dirname, '../../client.html'))
    const f = fs.readFileSync(path.join(__dirname, '../../client.html'), { encoding: 'utf-8' })
    res.send(f)
  });

  app.get('/_ping', (req, res) => res.status(200).send())

  app.use('/api/v1/beer', beerRouter(config))

  app.get('*', (req, res) => {
    res.status(404)
    res.send('Hmm, the thing that you are looking for is not there :S')
  })

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500)
    res.send('Oops, the server just broke')
  })

  return app
}

