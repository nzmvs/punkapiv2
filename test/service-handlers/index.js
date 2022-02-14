const { expect } = require('chai')
const sinon = require('sinon')
const serviceClients = require('../../lib/service-clients')
const serviceHandlers = require('../../lib/service-handlers')

describe('Service handler tests', () => {
  afterEach(() => sinon.restore())

  it('searchBeer()', async () => {
    const punkApiServiceClientStub = sinon
      .stub(serviceClients.PunkApiServiceClient.prototype, 'search')   
      .resolves({})

    await serviceHandlers.searchBeer({})

    expect(punkApiServiceClientStub.calledOnce).equal(true)
  })
})
