const { RestClient } = require('../helpers')

let punkApiServiceClient;

module.exports = class PunkApiServiceClient {
  static init(config) {
    punkApiServiceClient = new PunkApiServiceClient(config)
  }

  static instance() {
    if (!punkApiServiceClient) {
      throw new Error('Not initialized')
    }

    return punkApiServiceClient
  }

  constructor({ baseURL, endpoint }) {
    this.endpoint = endpoint
    this.restClient = new RestClient({
      baseURL: baseURL,
      timeout: 5000,
      transformResponse: [function (data) {
        return data && JSON.parse(data).map(beer => 
          ({ name: beer.name, abv: beer.abv,
            food_pairing: beer.food_pairing,
            description: beer.description
          })
      )}]
    })
  }

  search(params) {
    return this.restClient.get(this.endpoint, params)
      .then(data => data.data)
      .catch(error => {
        if (error.response.status === 404) {
          throw new Error('Resource unavailable')
        }
        throw error
      })
  }
}
