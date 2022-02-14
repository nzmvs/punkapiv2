const nock = require('nock')
const { expect } = require('chai')
const serviceClients = require('../../lib/service-clients')
const config = require('../../config')
const fixtures = require('../fixtures')

describe('Service client tests', () => {
  beforeEach(() => {
    serviceClients.PunkApiServiceClient.init(config.PunkApi)
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('PunkApiServiceClient', () => {
    it('Returns the correct payload', async() => {
      let nockQuery;

      nock(config.PunkApi.baseURL)
        .get(config.PunkApi.endpoint)
        .query(fixtures.punkApi.request)
        .reply(200, fixtures.punkApi.response)

      const returnValue = await serviceClients.PunkApiServiceClient.instance()
        .search(fixtures.punkApiServiceClient.input)
      
      expect(returnValue).deep.equal(fixtures.punkApiServiceClient.output)
    })

    it('Throws when Punk API returns 404', async() => {
      nock(config.PunkApi.baseURL)
        .get(config.PunkApi.endpoint)
        .query(fixtures.punkApi.request)
        .reply(404)

      try {
        await serviceClients.PunkApiServiceClient.instance()
          .search(fixtures.punkApiServiceClient.input)
        throw new Error('Should not throw')
      } catch (error) {
        expect(error.message).equal('Resource unavailable')
      }
    })
  })
})

