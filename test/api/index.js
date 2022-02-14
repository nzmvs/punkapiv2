const { expect } = require('chai')
const nock = require('nock')
const request = require('supertest')
const app = require('../../lib/api')
const config = require('../../config')
const { PunkApiServiceClient } = require('../../lib/service-clients')
const fixtures = require('../fixtures')

describe('API tests', () => {
  PunkApiServiceClient.init(config)

  let server;

  beforeEach(() => {
    server = app(config)
    nock.disableNetConnect()
  })

  afterEach(() => {
    server = null
    nock.cleanAll()
  })

  it('/_ping', () => {
    request(server).get('/_ping').expect(200)
  }) 
  
  it('/api/v1/beer', async() => {
    nock(config.PunkApi.baseURL)
      .get(config.PunkApi.endpoint)
      .query({ beer_name: 'punk' })
      .reply(200, fixtures.punkApi.response)

    request(server)
      .get('/api/v1/beer/search?beer_name=punk')
      .expect(200, fixtures.punkApiServiceClient.output)
  }) 
})
