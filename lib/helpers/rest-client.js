const { create } = require('axios')

module.exports = class RestClient {
  constructor(config) {
    this.client = create(config);
    this.client.interceptors.request.use(function (config) {
      console.log('rest-client request', {
        baseURL: config.baseURL,
        endpoint: config.url,
        method: config.method,
        params: config.params,
      })
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    this.client.interceptors.response.use(function (response) {
      console.log('rest-client response', {
        baseURL: response.config.baseURL,
        endpoint: response.config.url,
        method: response.config.method,
        params: response.config.params,
        status: response.status,
        data: response.data.length,
      })
      return response;
    }, function (error) {
      return Promise.reject(error);
    });
    this.client.defaults.adapter = require('axios/lib/adapters/http')
  }

  get(endpoint, params) {
    return this.client.get(endpoint, { params })
  }
}
