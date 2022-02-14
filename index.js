const config = require('./config')
const server = require('./lib/api')
const { PunkApiServiceClient } = require('./lib/service-clients')

PunkApiServiceClient.init(config.PunkApi)
server().listen(3000, () => {
  console.log('Server ready at port 3000')
})


