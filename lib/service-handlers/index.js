const { PunkApiServiceClient } = require('../service-clients')

const searchBeer = async (params) =>
  await PunkApiServiceClient.instance().search(params)

module.exports = {
  searchBeer,
}

